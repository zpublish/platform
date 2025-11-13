const boardZaddr = "zs1j29m7zdhhyy2eqrz89l4zhk0angqjh368gqkj2vgdyqmeuultteny36n3qsm47zn8du5sw3ts7f";

const prices = {
  post: .001,
  tweet: .01,
  highlight: .1
};

export async function GET() {
  return Response.json({ zaddr: boardZaddr, prices })
}