import { Priority, Todo } from "@/lib/data/types";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { setLocalTodos } from "@/lib/storeTodos";

type Props = {
  id: number;
  title: string;
  description: string;
  added: Date;
  dueDate: Date;
  priority: Priority;
  completed: boolean;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

const priorityColor = {
  lowest: "text-green-400",
  low: "text-green-500",
  normal: "text-blue-500",
  high: "text-yellow-500",
  highest: "text-red-500",
};

const TodoItem: React.FC<Props> = ({
  id,
  title,
  description,
  added,
  dueDate,
  priority,
  completed,
  todos,
  setTodos,
}) => {
  const [complete, setComplete] = useState(completed);

  const dateAdded = new Date(added).toDateString();
  const dateDue = new Date(dueDate).toDateString();

  const onCheck = () => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
    setLocalTodos(newTodos);
    setComplete(!complete);
  };
  const onUpdate = () => {};
  const onDelete = () => {};
  return (
    <Card className="hover:scale-105 transition-all ease-in-out duration-100 m-2 cursor-pointer w-full">
      <CardContent
        className={`px-4 py-2 text-left flex justify-between ${
          complete ? "line-through" : ""
        }`}
      >
        <Dialog>
          <DialogTrigger className="flex justify-between">
            <Label
              className={`hover:underline transition-all ease-in duration-75 cursor-pointer`}
            >
              {title}
            </Label>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl">{title}</DialogTitle>
              <DialogDescription className="text-lg font-medium">
                {description}
              </DialogDescription>
            </DialogHeader>
            <Label
              className={`text-base font-medium ${priorityColor[priority]} ${
                priority === "highest" ? "animate-pulse" : ""
              }`}
            >
              Priority: {priority}
            </Label>
            <Label className="text-base font-medium">
              Due Within: {dateDue}
            </Label>
            <Label className="text-base font-light">Added: {dateAdded}</Label>
            <DialogFooter className="">
              <Button variant={"destructive"} onClick={onDelete}>
                Delete
              </Button>
              <Button variant={"outline"} onClick={onUpdate}>
                Update
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Checkbox
          id="todo-check"
          defaultChecked={complete}
          onCheckedChange={onCheck}
        />
      </CardContent>
    </Card>
  );
};

export default TodoItem;
