// const db = require("../data/db-config.js");

import { getDb } from ".."
import { insertVote } from "../votes/votes.repository"
import { findPostByTxid, insertPost, setPostLikes, setPostReplyCount } from "./posts.repository"
import { InsertableBoardPosts } from "./posts.table"

// const Users = require("../users/users-model")
const likeRegex = /LIKE::(\d+)/i
const replyRegex = /REPLY::(\d+)/i
const subscribeRegex = /SUBSCRIBE::(\d+)::(\d+)/i
const filterRegex = /FILTER::(\w_+)::(\w_+)/i
const boardRegex = /BOARD::( *)(\w+)/i
const zaddrRegex = /zs[a-z0-9]{76}/i;
const uaddrRegex = /u1\w{211}/
const oaddrRegex = /^u1\w{104}$/
const subscribeZaddrRegex = /SUBSCRIBE::(\d+)::zs[a-z0-9]{76}/i
const voteRegex = /^VOTE::/i
const pollRegex = /^POLL::/i
const splitMemoRegex = /-\d+$/
const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\\=]*)/ig
// const axios = require("axios")


// const key= process.env.PUBLISHING_KEY;
// const ZECPAGES_ID = 769;


export async function add(data: {
  memo?: string,
  amount: number,
  datetime: string,
  txid: string,
}) {
  const db = await getDb();

  const newPost: InsertableBoardPosts = {
    memo: `${data.memo}`,
    amount: Number(data.amount),
    datetime: String(data.datetime),
    txid: String(data.txid),
  };

  if (!data.memo) {
    return { error: 'No memo found' };
  }
  if (!data.txid) {
    return { error: 'invalid post' }
  }
    try {
  
      const decodedMemo: string = Buffer.from(data.memo, "base64").toString("utf8")
      if (likeRegex.test(decodedMemo)) { // @ts-ignore
          newPost.memo = decodedMemo.match(likeRegex)?.[0]
      } 

      // const decodedBoardTag = Buffer.from(post.memo.split(" ")[0], "base64").toString("utf8")
      // if (boardRegex.test(decodedBoardTag)) {
      //     post.memo = post.memo.replace(post.memo.split(" ")[0], decodedBoardTag)
      // }
      
      const decodedReplyTag = Buffer.from(data.memo.split(" ")[0], "base64").toString("utf8")
      if (replyRegex.test(decodedReplyTag)) {
          newPost.memo = data.memo.replace(data.memo.split(" ")[0], decodedReplyTag)
      }

      const decodedVote = Buffer.from(data.memo, "base64").toString("utf8")
      if (voteRegex.test(decodedVote)) {
          newPost.memo = decodedVote
      } 
      const decodedPoll = Buffer.from(data.memo, "base64").toString("utf8")
      if (pollRegex.test(decodedPoll)) {
          newPost.memo = decodedPoll
      } 
    } catch (err) {
        console.log(err)
    }
    if (data.memo.includes("drive.google")) return {error: "Google Drive Link Detected"}

    if (data.memo.replace(/ /g, "").match(subscribeZaddrRegex)) {
        return { error: 'Subscriptions disabled' };
    } else if (data.memo.replace(/ /g, "").match(subscribeRegex)) {
        return { error: 'Subscriptions disabled' };
    }

    if (data.memo.replace(/ /g, "").match(voteRegex)) {
        const [meta, txid, option] = data.memo.split("::").map((s: string) => s.replace(/ /g, ""))
        const poll = await findPostByTxid(db, txid);
        if (poll && typeof option === 'number') {
          const newVote: { poll_id: number, poll_txid: string, option: number } = {
              poll_id: poll.id,
              poll_txid: txid,
              option
          }
          await insertVote(db, newVote);
          
          return [newVote]
        } else {
            console.log(data.memo)
            return [{message: 'vote failed.'}]
        }

    }

    // if (data.memo.match(filterRegex)) {
    //     const filteredFrom = post.memo.match(filterRegex)[0].split("::")[1]
    //     const filteredTo = post.memo.match(filterRegex)[0].split("::")[2]
    //     try {
    //         await db('word_filters').insert({ filtered_from: filteredFrom, filtered_to: filteredTo, date_created: Date.now() }).returning("*")
    //     } catch(err) {
    //         console.log(err)
    //     }
    //     return [{filter: `${filteredFrom}::${filteredTo}`}]
    // }

    if (data.memo.replace(/ /g, "").match(likeRegex)) {
        newPost.memo = data.memo.replace(/ /g, "");
        const like = data.memo.match(likeRegex)?.[0]
        const postTxid = like?.split("::")[1].split(" ")[0]
        if (postTxid) {
          const likedPost = await findPostByTxid(db, postTxid)
          if (likedPost) {
            await setPostLikes(db, postTxid, likedPost?.amount + data.amount, (likedPost.likes || 0) + 1)
            // await db('board_posts').where({id: postId}).update({amount: likedPost.amount + post.amount, likes: likedPost.likes + 1})
            return [{new_amount: likedPost.amount + data.amount, liked_post_txid: Number(postTxid)}]
          }
        }
        return { error: 'invalid like' };
    } else {
        if (data.memo.match(zaddrRegex) || data.memo.match(uaddrRegex) || data.memo.match(oaddrRegex)) {
            const replyZaddr = data.memo.match(zaddrRegex)?.[0] || data.memo.match(uaddrRegex)?.[0] || data.memo.match(oaddrRegex)?.[0];
            if (replyZaddr) {
              newPost.reply_zaddr = replyZaddr;
            }
        }
        if (data.memo.match(replyRegex)) {
            const replyId = data.memo.match(replyRegex)?.[0].split("::")[1]
            if (replyId) {
              const repliedPost = await findPostByTxid(db, replyId);
              if (repliedPost?.reply_count !== undefined) {
                await setPostReplyCount(db, replyId, repliedPost.reply_count + 1);
                newPost.reply_to_post = repliedPost.id;
              }
            }
        }

        if (data.memo.match(pollRegex)) {
            newPost.ispoll=true
            try {
                JSON.parse(data.memo.replace(/poll::/ig, ""))
            } catch(e) {
                return ["Invalid poll"]
            }
        }

        if (data.memo.match(boardRegex)) {
          const boardName = data.memo.match(boardRegex)?.[0].split("::")[1].toLowerCase().replace(/[\\\/ ]/g, "")

          if (boardName) {
            newPost.board_name = boardName;
          }
        }

        

        
        if (data.txid) {
            let replyNum = data.txid.match(splitMemoRegex)
            if (replyNum) {
                const originalTxid = data.txid.replace(splitMemoRegex, "-1") 
                const replyingToPost = await findPostByTxid(db, originalTxid);
                if (replyingToPost) {
                    newPost.reply_to_post = replyingToPost.id
                }
            }

        }
        

        const newPostRes = await insertPost(db, newPost)
        // const newPost = await db('board_posts').insert(post).returning("*")
        
        return newPostRes;
    }
}