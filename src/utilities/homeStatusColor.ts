export const homeStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "green";
    case "overdue":
      return "red";
    case "sent":
      return "blue";
    case "accepted":
      return "green";
    case "expired":
      return "red";
    case "pending":
      return "yellow";
    default:
      return "gray";
  }
};
