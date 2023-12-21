import formatTime from "../../functions/formatTime";
import Button from "./Button";
import CountdownSettings from "../timerSettings/CountdownSettings";
import StopwatchSettings from "../timerSettings/StopwatchSettings";
import TabataSettings from "../timerSettings/TabataSettings";
import XYSettings from "../timerSettings/XYSettings";
import { useState } from "react";

const TimerCard = ({ timerSettings, onUpdate, onDelete , onMoveUp, onMoveDown}) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editedSettings, setEditedSettings] = useState(timerSettings);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    onUpdate(editedSettings);
    setIsEditing(false); 

  };

  const handleChangeSettings = (newSettings) => {
    setEditedSettings(newSettings);
  };

  return (
    <div>
      <div>{timerSettings.timerName}</div>
      {timerSettings.timerName === "stopwatch" && (
        <div>
          <p>Limit: {timerSettings.limit}</p>
        </div>
      )}
      {timerSettings.timerName === "countdown" && (
        <div>
          <p>Time: {formatTime(timerSettings.time)}</p>
        </div>
      )}
      {timerSettings.timerName === "tabata" && (
        <div>
          <div>
            <p>Work (seconds): {timerSettings.work}</p>
            <p>Rest (seconds): {timerSettings.rest}</p>
            <p>Rounds: {timerSettings.rounds}</p>
          </div>
        </div>
      )}
      {timerSettings.timerName === "xy" && (
        <div>
          <p>Time: {formatTime(timerSettings.time)}</p>
          <p>Rounds: {timerSettings.rounds}</p>
        </div>
      )}

      {isEditing ? (
        <div>
          {timerSettings.timerName === "stopwatch" && (
            <StopwatchSettings
              timerSettings={editedSettings}
              onChangeSettings={handleChangeSettings}
            />
          )}
          {timerSettings.timerName === "countdown" && (
            <CountdownSettings
              timerSettings={editedSettings}
              onChangeSettings={handleChangeSettings}
            />
          )}
          {timerSettings.timerName === "tabata" && (
            <TabataSettings
              timerSettings={editedSettings}
              onChangeSettings={handleChangeSettings}
            />
          )}
          {timerSettings.timerName === "xy" && (
            <XYSettings
              timerSettings={editedSettings}
              onChangeSettings={handleChangeSettings}
            />
          )}
          <Button name="Save" method={handleSaveClick} />
        </div>
      ) : (
        <div>
          <Button name="Edit" method={handleEditClick} />
          <Button name="Delete" method={onDelete} />
          <Button name="Up" method={onMoveUp} />
      <Button name="Down" method={onMoveDown} />
        </div>
      )}
    </div>
  );
};

export default TimerCard;
