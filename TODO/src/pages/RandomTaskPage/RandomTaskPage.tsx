import { useEffect, useState } from "react";
import axios from "axios";
import RandomTaskComponent from "./RandomTaskComponent";

const RandomTaskPage = () => {
  const [randomTasks, setRandomTasks] = useState(null);

  async function fetchRandomTask() {
    const response = await axios.get("https://dummyjson.com/todos/random");
    setRandomTasks(response.data);
  }

  useEffect(() => {
    fetchRandomTask();
  }, []);

  return (
    <>
      <div style={{ padding: "2px" }}>
        {randomTasks ? (
          <RandomTaskComponent
            randomTasks={randomTasks}
            fetchRandomTask={fetchRandomTask}
          />
        ) : (
          <p>Loading ...</p>
        )}
      </div>
    </>
  );
};

export default RandomTaskPage;
