import { Priority } from "@/types";
import { MinusIcon, Bars2Icon, Bars3Icon } from "@heroicons/react/24/outline";

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength) + "...";
}

export const formattedDate = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

export const getPriorityIcon = (priority: Priority): JSX.Element | null => {
  switch (priority) {
    case "low":
      return <MinusIcon height={20} width={20} />;
    case "medium":
      return <Bars2Icon height={20} width={20} />;
    case "high":
      return <Bars3Icon height={20} width={20} />;
    default:
      return null;
  }
};
