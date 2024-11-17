# Timeline Visualization Tool

This project is a **React-based timeline visualization tool** that allows users to visualize and interact with layered schedules and user events. The tool supports multiple views, customizable time ranges, and smooth navigation through a visually appealing interface.

## Deployed Link:
https://zeazonztimelinechart.vercel.app/

## Features

- **Dynamic Timeline**: Displays layered schedules for multiple users with unique colors for easy identification.
- **Interactive Views**: Switch between multiple time views:
  - Month
  - 2-Weeks
  - Week
  - 2-Days
  - Day
- **Customizable Time Range**: Adjust timeline range using year and month selectors.
- **Smooth Navigation**: Navigate to the previous or next period, or jump to today's date.
- **User-Friendly Interface**: Designed with Material-UI for enhanced visual appeal and usability.

## Tech Stack

- **React**: Frontend framework for building interactive components.
- **Material-UI (MUI)**: Styling and UI components for an enhanced user interface.
- **React Calendar Timeline**: Timeline visualization library.
- **Day.js**: Lightweight library for date manipulation.
- **CSS**: Custom styles for further refinement.
- **JSON**: Input data structure for dynamic rendering.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/timeline-visualization.git
   cd timeline-visualization

## How to run: 
- **Install Dependencies**: npm install
- **Run the application**: npm start
- **Open your browser and navigate to**: http://localhost:3000

## Project Structure
src/
├── components/
│   ├── TimelineChart.jsx    # Main component for timeline rendering
├── data.json                # Sample data for testing
├── App.jsx                  # Main application entry
├── index.js                 # React DOM entry point
├── styles.css               # Custom CSS for styling
