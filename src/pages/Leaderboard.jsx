import { useEffect, useState } from "react";

const Leaderboard = () => {
  const [traders, setTraders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users?_sort=portfolioValue&_order=desc") // Sort users by portfolio value
      .then((res) => res.json())
      .then((data) => setTraders(data));
  }, []);

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">🏆 Leaderboard - Top Traders</h2>
      <table className="w-full text-left border border-gray-700">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-2">Rank</th>
            <th className="p-2">Trader</th>
            <th className="p-2">Portfolio Value</th>
          </tr>
        </thead>
        <tbody>
          {traders.map((trader, index) => (
            <tr key={trader.id} className="border-t border-gray-700">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{trader.username}</td>
              <td className="p-2 text-yellow-400">${trader.portfolioValue.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
