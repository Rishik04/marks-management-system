import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

const StudentReport = ({ totalmark, subject }) => {
  const colors = [
    "#0B2447",
    "#088395",
    "#0A4D68",
    "#A5C0DD",
    "#6C9BCF",
    "#654E92",
  ];

  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const subjectNames = subject.map((s) => s.name);
  const marks = [];
  subject.forEach((s) => {
    marks.push(s.marks);
  });

  const data = {
    labels: subjectNames,
    title: ["one", "two", "three"],
    datasets: [
      {
        label: "Marks Obtained",
        data: marks,
        backgroundColor: colors,
        borderColor: "#fff",
        borderWidth: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "OVER ALL CLASS PERFOMANCE",
      },
    },
  };

  const labels = ["Average Perfomance", "Your Perfomance", "Highest Perfomance"];
  const bar = [50, 32, 85];
  const barData = {
    labels: labels,
    datasets: [
      {
        label: "Marks",
        data: bar,
        backgroundColor: colors,
      },
    ],
  };

  return (
    <div>
      <div className="title-container">
        <h3>YOUR REPORT</h3>
      </div>
      <div className="chart">
        <div className="chart-desc">
          <h4>
            A student performance report is a document or presentation that
            provides information about the academic progress and achievements of
            a student. It typically includes data such as grades, test scores,
            attendance, behavior, and other relevant metrics. The purpose of a
            student performance report is to give teachers, parents, and
            administrators an overview of how well a student is performing
            academically and where they may need additional support or
            resources. These reports can also be used to track trends in student
            performance over time and to identify areas for improvement in
            educational programs and policies.
          </h4>
        </div>
        <div className="chart-All">
          <div className="chart-doughnut">
            <Doughnut data={data} options={{plugins: {title:{display: true, text: "YOUR PERFOMANCE"}}}}/>
            <p>
              Overall Perfomance:{" "}
              {((totalmark / (subject.length * 25)) * 100).toFixed(2)}%
            </p>
          </div>
          <div className="chart-bar">
            <Bar data={barData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentReport;
