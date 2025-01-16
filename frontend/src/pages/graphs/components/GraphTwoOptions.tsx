export const GraphTwoOptions = {
    responsive: true,
    plugins: {
      legend: {
          position: 'top' as const,
        },
      tooltip: {
        callbacks: {
          label: (context: { raw: any; }) => `Value: ${context.raw}`,
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
        ticks: {
          font: {
            size: 12,
          },
          callback: (value: any) => {
            const formattedValue = parseFloat(value).toFixed(2);
            return `${formattedValue}€`;
          },
        },
        beginAtZero: false,
      },
    },
    elements: {
      line: {
        borderWidth: 2, // Thinner line for stock market style
        tension: 0.3, // Smooth the lines
      },
      point: {
        radius: 0, // Hide points for a cleaner look
        hoverRadius: 6, // Highlight points on hover
      },
    },
    animation: {
      duration: 800,
    },
  };