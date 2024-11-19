import { useEffect, useState } from "react";
import axios from "axios";
import RandomTaskComponent from "./RandomTaskComponent";
import AnimationComponent from "../../components/Animation/Animation";

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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AnimationComponent />
          </div>
        )}
      </div>
    </>
  );
};

export default RandomTaskPage;
