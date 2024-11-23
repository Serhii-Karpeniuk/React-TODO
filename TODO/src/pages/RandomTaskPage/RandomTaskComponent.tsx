import { useState, FC } from "react";
import closeImage from "../../images/close-img.png";
import "./RandomTaskPage.scss";

interface RandomTask {
  todo: string;
}

interface RandomTaskComponentProps {
  randomTasks: RandomTask;
  fetchRandomTask: () => void;
}

const RandomTaskComponent: FC<RandomTaskComponentProps> = ({
  randomTasks,
  fetchRandomTask,
}) => {
  const [randomTaskModal, setRandomTaskModal] = useState(false);

  function changeRandomTask() {
    fetchRandomTask();
    setRandomTaskModal(true);
  }

  return (
    <>
      <div>
        <button className="random__button" onClick={changeRandomTask}>
          Generate Random Task
        </button>
        {randomTaskModal && (
          <div
            style={{
              border: "1px solid black",
              marginTop: "10px",
              backgroundColor: "#F0F8FF",
              paddingLeft: "5px",
              borderRadius: "5px",
            }}
          >
            <img
              src={closeImage}
              className="close__img"
              onClick={() => setRandomTaskModal(false)}
            />
            <div className="randomTask__container">
              <h3 className="randomTask__title">Random task:</h3>
              <p className="text-blue-800 pl-1">{randomTasks.todo}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RandomTaskComponent;
