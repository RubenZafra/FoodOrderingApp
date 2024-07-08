export function formatDateRelative(dateString: string): string {
  const inputDate = new Date(dateString);
  const currentDate = new Date();
  const differenceInMs = currentDate.getTime() - inputDate.getTime();
  const differenceInHours = differenceInMs / (1000 * 60 * 60);
  const differenceInDays = differenceInHours / 24;

  if (differenceInHours < 24) {
    const hours = Math.floor(differenceInHours);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (differenceInDays <= 7) {
    const days = Math.floor(differenceInDays);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else {
    const day = inputDate.getDate();
    const month = inputDate.toLocaleString("default", { month: "long" });
    const year = inputDate.getFullYear();
    return `On ${day} of ${month} of ${year}`;
  }
}
