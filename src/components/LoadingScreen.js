import ProgressBar from './ProgressBar';

// ----------------------------------------------------------------------

const styles = {
    loading: isDashboard => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: isDashboard ? '#f4f6f8' : '#fff',
    }),
    svg: {
        width: '64px',
        height: '48px',
    },
    polyline: {
        fill: 'none',
        strokeWidth: 3,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
    },
    back: {
        stroke: '#ff4d5033',
    },
    front: {
        stroke: '#ff4d4f',
        strokeDasharray: '48, 144',
        strokeDashoffset: 192,
        animation: 'dash_682 1.4s linear infinite',
    },
    '@keyframes dash_682': {
        '72.5%': {
            opacity: 0,
        },
        to: {
            strokeDashoffset: 0,
        },
    },
};

export default function LoadingScreen({ isDashboard, ...other }) {
    return (
        <>
            <style>
                {`
          @keyframes dash_682 {
            72.5% {
              opacity: 0;
            }
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
            </style>
            <div style={styles.loading(isDashboard)}>
                <svg style={styles.svg}>
                    <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" style={{ ...styles.polyline, ...styles.back }}></polyline>
                    <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" style={{ ...styles.polyline, ...styles.front }}></polyline>
                </svg>
            </div>
        </>
    );
}
