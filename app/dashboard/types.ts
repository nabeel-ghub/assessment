export type Todo = {
  id: number;
  title: string;
  description: string;
  status: "todo" | "progress" | "done";
  due: Date;
};
