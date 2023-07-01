"use client";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DashboardHeader from "./DashboardHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormData {
  age: number;
  height: number;
  weight: number;
  gender: string;
  experience: string;
  objective: string;
  injuries: string;
  availability: string;
  equipment: string;
}
// import { config } from "dotenv";
// config();

const schema = z.object({
  age: z.string().nonempty("Age is required"),
  height: z.string().nonempty("Height is required"),
  weight: z.string().nonempty("Weight is required"),
  gender: z.string(),
  experience: z.string(),
  objective: z.string(),
  injuries: z.string(),
  availability: z.string(),
  equipment: z.string(),
});

const DashboardPage: FC = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    getCompletion(data);
    console.log(data);
  };

  const [response, setResponse] = useState<React.JSX.Element>();

  const handleSetResponse = (message: React.JSX.Element) => {
    setResponse(message);
  };
  const getCompletion = async (message: FormData) => {
    handleSetResponse(<p>Loading...</p>);
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `I want you to act as a personal coach that can make a custom fitness and meal plan. I will give you some information (height, age, weigth, goal, injuries, calendar etc.), and you will return the weekly fitness and meal plan to follow. Give detail about each session with the exercises to do, the duration of the session, the muscle groups to focus
          1. Height: ${message.height}cm 
          2. Age: ${message.age} years
          3. Weight: ${message.weight}kg
          4. Gender: ${message.gender}
          5. Experience: ${message.experience}
          6. Objective: ${message.objective}
          7. Injuries: ${message.injuries}
          8. Availability: ${message.availability}
          9. Equipment: ${message.equipment}
          Please follow the following format:
          Fitness Plan:
          Day X: (training objective)
           - Duration:
           - Muscle Groups to Focus:
           - Exercises:
            (list the exercises)
          
          Meal Plan:
          Meal X (meal type)
           - Meal 1
           - Meal 2
           - Meal 3

          Don't provide any additional information or note 
          `,
          },
        ],
      }),
    };
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();

    console.log(data);

    handleSetResponse(<pre>{data.choices[0].message?.content}</pre>);
  };

  return (
    <div>
      <DashboardHeader />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-20 pt-16 pb-8 bg-slate-100 rounded-xl"
      >
        <div className="grid xl:grid-cols-3 gap-y-10 grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-row items-center space-x-4 justify-center">
            <label className="font-semibold">Age:</label>
            <input
              type="number"
              {...register("age")}
              className="border rounded border-black py-1 px-3 w-56"
            />
            {errors.age && (
              <p className="text-red-500 text-xs">{errors.age.message}</p>
            )}
          </div>

          <div className="flex flex-row items-center space-x-4 justify-center">
            <label className="font-semibold">Height: (cm)</label>
            <input
              type="number"
              className="border rounded border-black py-1 px-3 w-56"
              {...register("height")}
            />
            {errors.height && (
              <p className="text-red-500 text-xs">{errors.height.message}</p>
            )}
          </div>

          <div className="flex flex-row items-center space-x-4 justify-center">
            <label className="font-semibold">Weight: (kg)</label>
            <input
              type="number"
              className="border rounded border-black py-1 px-3 w-56"
              {...register("weight")}
            />
            {errors.weight && (
              <p className="text-red-500 text-xs">{errors.weight.message}</p>
            )}
          </div>

          <div className="flex flex-row items-center space-x-4 justify-center">
            <label className="font-semibold">Gender:</label>
            <Select
              onValueChange={(e) => {
                setValue("gender", e);
              }}
            >
              <SelectTrigger className="w-52 border-black">
                <SelectValue placeholder="Select a gender" />
              </SelectTrigger>
              <SelectContent className="w-52">
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && (
              <p className="text-red-500 text-xs">{errors.gender.message}</p>
            )}
          </div>

          <div className="flex flex-row items-center space-x-4 justify-center">
            <label className="font-semibold">Experience:</label>
            <Select
              onValueChange={(e) => {
                setValue("experience", e);
              }}
            >
              <SelectTrigger className="w-60 border-black">
                <SelectValue placeholder="Introduce your experience" />
              </SelectTrigger>
              <SelectContent className="w-60">
                <SelectItem value="None">None</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Competent">Competent</SelectItem>
                <SelectItem value="Expert">Expert</SelectItem>
              </SelectContent>
            </Select>
            {errors.experience && (
              <p className="text-red-500 text-xs">
                {errors.experience.message}
              </p>
            )}
          </div>

          <div className="flex flex-row items-center space-x-4 justify-center">
            <label className="font-semibold">Objective:</label>
            <Select
              onValueChange={(e) => {
                setValue("objective", e);
              }}
            >
              <SelectTrigger className="w-60 border-black">
                <SelectValue placeholder="Introduce your objective" />
              </SelectTrigger>
              <SelectContent className="w-60">
                <SelectItem value="Gain muscle mass">
                  Gain muscle mass
                </SelectItem>
                <SelectItem value="Lose weight">Lose weight</SelectItem>
                <SelectItem value="Gain strength">Gain strength</SelectItem>
                <SelectItem value="Improve resistance">
                  Improve resistance
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.objective && (
              <p className="text-red-500 text-xs">{errors.objective.message}</p>
            )}
          </div>

          <div className="flex flex-row items-center space-x-4 justify-center">
            <label className="font-semibold">Injuries:</label>
            <input
              className="border rounded border-black py-1 px-3 w-56"
              {...register("injuries")}
            />
            {errors.injuries && (
              <p className="text-red-500 text-xs">{errors.injuries.message}</p>
            )}
          </div>

          <div className="flex flex-row items-center space-x-4 justify-center">
            <label className="font-semibold">Availability:</label>
            <Select
              onValueChange={(e) => {
                setValue("availability", e);
              }}
            >
              <SelectTrigger className="w-60 border-black">
                <SelectValue placeholder="Introduce your objective" />
              </SelectTrigger>
              <SelectContent className="w-60">
                <SelectItem value="2 times/week">2 times/week</SelectItem>
                <SelectItem value="3 times/week">3 times/week</SelectItem>
                <SelectItem value="4 times/week">4 times/week</SelectItem>
                <SelectItem value="5 times/week">5 times/week</SelectItem>
              </SelectContent>
            </Select>
            {errors.availability && (
              <p className="text-red-500 text-xs">
                {errors.availability.message}
              </p>
            )}
          </div>

          <div className="flex flex-row items-center space-x-4 justify-center">
            <label className="font-semibold">Equipment:</label>
            <Select
              onValueChange={(e) => {
                setValue("equipment", e);
              }}
            >
              <SelectTrigger className="w-60 border-black">
                <SelectValue placeholder="Introduce your equipment" />
              </SelectTrigger>
              <SelectContent className="w-60">
                <SelectItem value="At home">Home</SelectItem>
                <SelectItem value="At the gym">Gym</SelectItem>
              </SelectContent>
            </Select>
            {errors.equipment && (
              <p className="text-red-500 text-xs">{errors.equipment.message}</p>
            )}
          </div>
        </div>
        <div className="text-center mt-16">
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Submit
          </button>
        </div>
      </form>

      {response && (
        <div className="mx-16 mt-10 mb-20">
          <p className="text-2xl font-semibold my-5 overflow-x-hidden">
            Response:
          </p>
          {response}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
