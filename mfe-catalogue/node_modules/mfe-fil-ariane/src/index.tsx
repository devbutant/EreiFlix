import ReactDOM from "react-dom/client";

const App = () => (
    <div className="text-blue-500 text-2xl font-bold">Mon fil d'ariane</div>
);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(<App />);
