import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-800 my-16">About FITGPT</h1>
      <div className="flex flex-col items-center justify-center mx-60 gap-5">
        <p>
          Welcome to FITGPT, your ultimate AI-powered personal fitness and meal
          planning assistant! Designed to cater to your unique health and
          wellness goals, FITGPT harnesses the power of artificial intelligence
          to provide you with personalized meal and fitness plans based on your
          specific needs. With FITGPT, achieving a balanced lifestyle has never
          been easier. By simply inputting your height, weight, and other
          relevant information, our advanced algorithms analyze your data and
          generate customized plans tailored to your individual requirements.
        </p>
        <p>
          Whether you`re looking to lose weight, gain muscle, improve overall
          fitness, or simply maintain a healthy lifestyle, FITGPT will guide you
          every step of the way. Our cutting-edge technology ensures that your
          journey towards a healthier you is efficient, enjoyable, and
          sustainable. FITGPT goes beyond generic meal and fitness plans by
          taking into account your dietary preferences, restrictions, and even
          your schedule.
        </p>
        <p>
          By considering these factors, FITGPT creates realistic and achievable
          goals that seamlessly fit into your daily routine, ensuring long-term
          success. Empower yourself with FITGPT and unlock your full potential.
          Start your transformative fitness journey today and let FITGPT be your
          trusted companion on the path to a healthier, happier you. With our
          intelligent AI-driven platform, achieving your fitness goals has never
          been more personalized, accessible, and effective.
        </p>
      </div>
    </div>
  );
};

export default page;
