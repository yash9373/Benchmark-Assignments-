import React, {
  createContext,
  useReducer,
  useContext,
  useMemo,
  useCallback,
} from "react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type TaskState = {
  tasks: Task[];
};

type Action =
  | { type: "ADD_TASK"; payload: string }
  | { type: "REMOVE_TASK"; payload: number }
  | { type: "TOGGLE_TASK"; payload: number };

const TaskReducer = (state: TaskState, action: Action): TaskState => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        tasks: [
          ...state.tasks,
          { id: Date.now(), text: action.payload, completed: false },
        ],
      };
    case "REMOVE_TASK":
      return {
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "TOGGLE_TASK":
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    default:
      return state;
  }
};

const TaskContext = createContext<
  | {
      state: TaskState;
      addTask: (text: string) => void;
      removeTask: (id: number) => void;
      toggleTask: (id: number) => void;
    }
  | undefined
>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(TaskReducer, { tasks: [] });

  const addTask = useCallback(
    (text: string) => dispatch({ type: "ADD_TASK", payload: text }),
    []
  );
  const removeTask = useCallback(
    (id: number) => dispatch({ type: "REMOVE_TASK", payload: id }),
    []
  );
  const toggleTask = useCallback(
    (id: number) => dispatch({ type: "TOGGLE_TASK", payload: id }),
    []
  );

  const contextValue = useMemo(
    () => ({ state, addTask, removeTask, toggleTask }),
    [state]
  );

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTaskContext must be used within a TaskProvider");
  return context;
};
