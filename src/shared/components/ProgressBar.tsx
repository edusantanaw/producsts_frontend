import { ProgressBarStyle } from "../styles/progressBar";

export const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <>
      <ProgressBarStyle w={`${progress}%`}>
        <div>
          <p>{progress} / 100</p>
        </div>
      </ProgressBarStyle>
    </>
  );
};
