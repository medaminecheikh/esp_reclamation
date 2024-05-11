import GetAllIssues from "services/jiraAPI/requests/GetAllIssues";
import getAllProjects from "services/jiraAPI/requests/getAllProjects";

// ===========================|| DASHBOARD - TOTAL GROWTH BAR CHART ||=========================== //

const projectLabels = [];
const statusDone = 'Done';
const statusProgress = 'In Progress';
const statusToDo = 'To Do';
const seriesData = [
    {name: 'Done ', data: []},
    {name: 'In Progress', data: []},
    {name: 'To Do', data: []}

];
try {
    const projects = await getAllProjects();
   

// Function to process issues for a single project
    const processProject = async (project, index) => {
        const site = project.key;
        projectLabels.push(project.name);

        const allIssues = await GetAllIssues({site});

        let doneCount = 0;
        let progressCount = 0;
        let toDoCount = 0;
        console.log('allIssues ', allIssues)
        allIssues.data.issues.forEach(issue => {
            switch (issue.fields.status.name) {
                case statusDone:
                    doneCount++;
                    break;
                case statusProgress:
                    progressCount++;
                    break;
                case statusToDo:
                    toDoCount++;
                    break;
                default:
                    break;
            }
        });

        // Push the counts to the respective series data arrays
        seriesData[0].data[index] = doneCount;
        seriesData[1].data[index] = progressCount;
        seriesData[2].data[index] = toDoCount;
    };

// Process issues for all projects concurrently
    await Promise.all(projects.map(processProject));
} catch (e) {
    console.error(e);
}

const chartData = {
  height: 480,
  type: 'bar',
  options: {
    chart: {
      id: 'bar-chart',
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%'
      }
    },
    xaxis: {
      type: 'category',
      categories: projectLabels
    },
    legend: {
      show: true,
      fontSize: '14px',
      fontFamily: `'Roboto', sans-serif`,
      position: 'bottom',
      offsetX: 20,
      labels: {
        useSeriesColors: false
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8
      }
    },
    fill: {
      type: 'solid'
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: true
    }
  },
  series: seriesData
};
export default chartData;
