import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';

export const getTimeAgo = (createdAt: Date) => {
  if (!createdAt) { return ''; }

  let timeAgoText;
  if (differenceInDays(new Date(), createdAt) <= 0) {
    if (differenceInHours(new Date(), createdAt) === 0) {
      timeAgoText = `${differenceInMinutes(new Date(), createdAt)}m`;
    } else {
      timeAgoText = `${differenceInHours(new Date(), createdAt)}h`;
    }
  } else {
    const formatter = new Intl.DateTimeFormat('en-US', { month: 'short' });
    const shortMonth = formatter.format(createdAt);
    timeAgoText = `${shortMonth} ${createdAt.getDate()} ${createdAt.getFullYear()}`;
  }

  return timeAgoText;
}
