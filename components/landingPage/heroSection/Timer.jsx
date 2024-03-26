import Countdown from "react-countdown";
const time = new Date("2024-03-29").getTime();

const Timer = () => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    // Render a countdown
    return (
      <span>
        {days}:{hours}:{minutes}:{seconds}
      </span>
    );
  };
  return (
    <div>
      <Countdown className="text-5xl" date={time} renderer={renderer} />
    </div>
  );
};

export default Timer;
