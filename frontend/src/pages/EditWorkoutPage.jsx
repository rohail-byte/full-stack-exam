import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const EditWorkoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [workoutTitle, setWorkoutTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState(""); 
  const [state, setState] = useState("");
  const [sessionPrice, setSessionPrice] = useState(0);
  const [fitnessLevel, setFitnessLevel] = useState("Beginner");
  const [status, setStatus] = useState("Active");
  const [requiredEquipment, setRequiredEquipment] = useState("");


  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch(`/api/workouts/${id}`);
      const data = await response.json();
      setWorkoutTitle(data.workoutTitle);
      setDescription(data.description);
      setCity(data.city);
      setState(data.state);
      setSessionPrice(data.sessionPrice);
      setFitnessLevel(data.fitnessLevel);
      setStatus(data.status);
      setRequiredEquipment(data.requiredEquipment.join(", "));

    };

    fetchWorkout();
  }, [id]);


consthandleSubmit = async (e) => {
  e.preventDefault();
  const updatedWorkout = {
    workoutTitle,
    description,
    location: {
      city,
      state
    },
    sessionPrice,
    fitnessLevel,
    status,
    requiredEquipment: requiredEquipment.split(", ").map((item) => item.trim())
  };

  const response = await fetch(`/api/workouts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedWorkout)
  });

  if (response.ok) {
    navigate(`/workouts/${id}`);
  }
};

  return (
    <div className="create">
      <h2>Update Workout</h2>
      <form>
        <div>
          <label>Workout Title:</label>
          <input
            type="text"
            value={workoutTitle}
            onChange={(e) => setWorkoutTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div>
          <label>Session Price:</label>
          <input
            type="number"
            step="0.01"
            value={sessionPrice}
            onChange={(e) => setSessionPrice(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label>Fitness Level:</label>
          <select
            value={fitnessLevel}
            onChange={(e) => setFitnessLevel(e.target.value)}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label>Required Equipment:</label>
          <input
            type="text"
            value={requiredEquipment}
            onChange={(e) => setRequiredEquipment(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditWorkoutPage;
