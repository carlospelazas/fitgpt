import { FC } from "react";

interface DashboardHeaderProps {}

const DashboardHeader: FC<DashboardHeaderProps> = ({}) => {
  return (
    <div className="text-center my-8">
      <p className="text-2xl font-bold">
        Input the information in the fields below to create your plan
      </p>
    </div>
  );
};

export default DashboardHeader;
