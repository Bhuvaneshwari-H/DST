import React, { Component } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js/auto';
import './Dashboard.css';
import Popup from './Popup'; // Import the Popup component

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departmentCounts: {},
      diseaseCounts: {},
      numberOfDocs: 0,
      numberOfPatients: 0,
      selectedDoctors: [],
      selectedPatients: [],
      popupData: [],
      isPopupOpen: false,
      popupPosition: { x: 0, y: 0 },
      popupColor: '#FFFFFF',
    };
    this.chartRef = React.createRef();
    this.doctorChartRef = React.createRef();
  }

  async componentDidMount() {
    try {
      const [doc, patients, departments, diseases] = await Promise.all([
        axios.get('http://localhost:1337/doctors/count'),
        axios.get('http://localhost:1337/patients/count'),
        axios.get('http://localhost:1337/doctors/countByDepartment'),
        axios.get('http://localhost:1337/patients/countByDisease'),
      ]);

      const departmentCounts = departments.data;
      const diseaseCounts = diseases.data;

      this.setState({
        numberOfDocs: doc.data.count,
        numberOfPatients: patients.data.count,
        departmentCounts: departmentCounts,
        diseaseCounts: diseaseCounts,
      });

      this.renderChart();
      this.renderDoctorChart();

      if (this.doctorChartRef.current) {
        this.doctorChartRef.current.addEventListener('click', this.handleChartClick);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  handleChartClick = async (event) => {
    const activeElement = this.doctorChartInstance.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false)[0];
    if (activeElement) {
      const departmentName = this.doctorChartInstance.data.labels[activeElement.index];
      const doctors = await this.fetchDoctorsByDepartment(departmentName);
      const popupColor = this.doctorChartInstance.data.datasets[0].backgroundColor[activeElement.index] || '#FFFFFF';
      const chartPosition = this.chartRef.current.getBoundingClientRect();
      const popupPosition = {
        x: event.clientX - chartPosition.left,
        y: event.clientY - chartPosition.top,
      };
      this.setState({ selectedDoctors: doctors, popupData: doctors, isPopupOpen: true, popupPosition, popupColor });
    }
  }

  handleClosePopup = () => {
    this.setState({ isPopupOpen: false });
  }

  fetchDoctorsByDepartment = async (department) => {
    try {
      const response = await axios.get(`http://localhost:1337/doctors/getDoctorsByDepartment?department=${department}`);
      const doctors = response.data.doctors;
      return doctors;
    } catch (error) {
      console.error('Error fetching doctors by department:', error);
      return [];
    }
  }

  fetchPatientsByDisease = async (disease) => {
    try {
      const response = await axios.get(`http://localhost:1337/patients/getPatientsByDisease?disease=${disease}`);
      const patients = response.data.patients;
      return patients;
    } catch (error) {
      console.error('Error fetching patients by disease:', error);
      return [];
    }
  }

  renderChart() {
    const { diseaseCounts } = this.state;
    const totalPatients = Object.values(diseaseCounts).reduce((acc, count) => acc + count, 0);

    const chartData = {
      labels: Object.keys(diseaseCounts),
      datasets: [{
        data: Object.values(diseaseCounts),
        backgroundColor: ['#0033cc', '#ff0000', '#00ff00', '#ff00ff', '#ff9900', '#663300', '#999966', '#999966', '#ff0066'],
        borderColor: 'rgba(0, 0, 0, 0.1)',
        total: totalPatients,
      }]
    };

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    if (this.chartRef.current) {
      const ctx = this.chartRef.current.getContext('2d');

      this.chartInstance = new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Number of Patients by Disease',
              font: { size: 20 },
              color: 'black',
            },
            legend: { display: true, position: 'bottom' },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  const percentage = ((value / totalPatients) * 100).toFixed(2);
                  return `${label}: ${value} (${percentage}%)`;
                }
              }
            }
          },
          elements: { arc: { borderWidth: 1 } },
          legend: { labels: { font: { weight: 'bold' } } }
        },
      });
    } else {
      console.error('Chart reference not found!');
    }
  }

  renderDoctorChart() {
    const { departmentCounts } = this.state;
    const totalDoctors = Object.values(departmentCounts).reduce((acc, val) => acc + val, 0);

    const chartData = {
      labels: Object.keys(departmentCounts),
      datasets: [{
        data: Object.values(departmentCounts),
        backgroundColor: ['#0033cc', '#ff0000', '#00ff00', '#ff00ff', '#ff9900', '#663300', '#999966', '#999966', '#ff0066'],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      }]
    };

    if (this.doctorChartRef.current) {
      const ctx = this.doctorChartRef.current.getContext('2d');

      if (this.doctorChartInstance) {
        this.doctorChartInstance.destroy();
      }

      this.doctorChartInstance = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            x: {
              type: 'category',
              title: { display: true, text: 'Department', font: { size: 14, weight: 'bolder' } },
              ticks: { font: { size: 14, weight: 'bolder' } },
            },
            y: {
              beginAtZero: true,
              title: { display: true, text: 'Number of Doctors', font: { size: 14, weight: 'bolder' } },
              ticks: { font: { size: 12, weight: 'bolder' } },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  const department = chartData.labels[context.dataIndex];
                  const count = context.dataset.data[context.dataIndex];
                  const percentage = ((count / totalDoctors) * 100).toFixed(2);
                  return `${department}: ${count} (${percentage}%)`;
                }
              }
            },
            title: { display: true, text: 'Number of Doctors by Department', font: { size: 20, weight: 'bolder' } },
          },
        },
      });
    } else {
      console.error('Doctor chart reference not found!');
    }
  }

  handleDiseaseChartClick = async (event) => {
    const activeElement = this.chartInstance.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false)[0];
    if (activeElement) {
      const index = activeElement.index;
      const dataset = this.chartInstance.data.datasets[0];
      const bars = this.chartInstance.getDatasetMeta(0).data;
  
      // Reset border width and color for all bars
      bars.forEach((bar, i) => {
        bar.borderWidth = 0;
        bar.borderColor = 'transparent';
      });
  
      // Highlight the selected bar by increasing its border width and setting a dark color
      bars[index].borderWidth = 4;
      bars[index].borderColor = 'black';
  
      // Redraw the chart to reflect the changes
      this.chartInstance.update();
  
      const diseaseName = this.chartInstance.data.labels[index];
      const patients = await this.fetchPatientsByDisease(diseaseName);
      const popupColor = dataset.backgroundColor[index] || '#FFFFFF';
      const chartPosition = this.chartRef.current.getBoundingClientRect();
      const popupPosition = {
        x: event.clientX - chartPosition.left,
        y: event.clientY - chartPosition.top,
      };
      this.setState({ selectedPatients: patients, popupData: patients, isPopupOpen: true, popupPosition, popupColor });
    }
  }
  

  render() {
    const { numberOfPatients, selectedDoctors, selectedPatients, popupData, isPopupOpen, popupPosition, popupColor } = this.state;

    return (
      <div className="page-container" style={{ position: 'relative', top: '-70px' }}>
        <div className="top-header" style={{ width: '100%' }}>
          <p style={{ paddingLeft: '20px', marginTop: '-180px', fontFamily: 'playfair-display-uniquifier', fontWeight: '600', fontSize: '25px', textAlign: 'center' }}>DASHBOARD</p>
          <hr className="horizontal-line" style={{ borderColor: '#4365CF', width: '800%' }} />
        </div>
        <div className="split-container">
          <div className="content1">
            <div className="doctor-canvas-container">
              <span style={{ fontSize: '25px', fontWeight: '600', marginLeft: '-200px' }}></span>
              <canvas ref={this.doctorChartRef} style={{ marginLeft: '-200px', marginTop: '-100px' }}></canvas>
            </div>
          </div>
          <div className="content2" style={{ marginLeft: 'auto', position: 'relative' }}>
            <div className="disease-canvas-container">
              <canvas ref={this.chartRef} style={{ marginLeft: '150px', marginRight: '-200px', marginTop: '-60px' }} onClick={this.handleDiseaseChartClick}></canvas>
              {isPopupOpen && <Popup data={popupData} position={popupPosition} onClose={this.handleClosePopup} backgroundColor={popupColor} />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
