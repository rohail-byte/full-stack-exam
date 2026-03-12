import { use } from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const WorkoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  
  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch(`/api/workouts/${id}`);
      const data = await response.json();
      setWorkout(data);
    };

    fetchWorkout();
  }, [id]);

  // TODO (Q4): Implement this component
  // - Fetch the workout from /api/workouts/:id when the component mounts (useEffect)
  // - Store the workout in state (useState)
  // - Display ALL workout fields:
  //   workoutTitle, description,
  //   city, state, session price, fitness level, status,
  //   required equipment
  // - Add a Delete button that sends DELETE to /api/workouts/:id and navigates to "/"
  // - Add an Edit link to /edit-workout/:id


  return (
    <div className="rental-preview">
      <h2>Workout Details</h2>
      {workout ? (
        <div>
          <p><strong>Workout Title:</strong> {workout.workoutTitle}</p>
          <p><strong>Description:</strong> {workout.description}</p>
          <p><strong>City:</strong> {workout.city}</p>
          <p><strong>State:</strong> {workout.state}</p>
          <p><strong>Session Price:</strong> ${workout.sessionPrice.toFixed(2)}</p>
          <p><strong>Fitness Level:</strong> {workout.fitnessLevel}</p>
          <p><strong>Status:</strong> {workout.status}</p>
          <p><strong>Required Equipment:</strong> {workout.requiredEquipment.join(", ")}</p>
          <button onClick={handleDelete}>Delete Workout</button>
          <Link to={`/edit-workout/${id}`}>Edit Workout</Link>
        </div>
      ) : (
        <p>Workout not found</p>
      )}
    </div>
  );
};



export default WorkoutPage;
