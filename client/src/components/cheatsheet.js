import React from "react";
import "../styles/cheatsheet.css";

// Card Component
const Card = ({ imgSrc, altText, title, description }) => (
  <div className="card">
    <img src={imgSrc} alt={altText} />
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

// Category Component
const Category = ({ title, cards }) => (
  <section className="category">
    <h2>{title}</h2>
    <div className="card-container">
      {cards.map((card, index) => (
        <Card
          key={index}
          imgSrc={card.imgSrc}
          altText={card.altText}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  </section>
);

// Main App Component
const App = () => {
  const categories = [
    {
      title: "Gym Equipment",
      cards: [
        {
          imgSrc: "../../treadmill.jpg",
          altText: "Treadmill",
          title: "Treadmill",
          description: "Perfect for cardio and endurance training.",
        },
        {
          imgSrc: "../../dumbells.jpg",
          altText: "Dumbbells",
          title: "Dumbbells",
          description: "Versatile equipment for strength training.",
        },
        {
          imgSrc: "../../benchpress.jpg",
          altText: "Bench Press",
          title: "Bench Press",
          description: "Build chest and upper body strength.",
        },
        {
          imgSrc: "../../cablemachine.jpg",
          altText: "Cable Machine",
          title: "Cable Machine",
          description: "Great for targeted muscle isolation exercises.",
        },
        {
          imgSrc: "../../rowingmachine.jpg",
          altText: "Rowing Machine",
          title: "Rowing Machine",
          description: "Combines cardio and full-body strength training.",
        },
        {
          imgSrc: "../../legpress.jpg",
          altText: "Leg Press",
          title: "Leg Press",
          description: "Target your quadriceps, hamstrings, and calves.",
        },
        {
          imgSrc: "../../pullupbar.jpg",
          altText: "Pull-Up Bar",
          title: "Pull-Up Bar",
          description: "Build upper body and core strength.",
        },
        {
          imgSrc: "../../kettlebell.jpg",
          altText: "Kettlebells",
          title: "Kettlebells",
          description: "Improve functional strength and endurance.",
        },
      ],
    },
    {
      title: "Exercises",
      cards: [
        {
          imgSrc: "../../squats.jpg",
          altText: "Squats",
          title: "Squats",
          description: "Build lower body strength and core stability.",
        },
        {
          imgSrc: "../../deadlift.jpg",
          altText: "Deadlifts",
          title: "Deadlifts",
          description: "Essential for full-body strength development.",
        },
        {
          imgSrc: "../../plank.jpg",
          altText: "Plank",
          title: "Plank",
          description: "Core-strengthening exercise to improve stability.",
        },
        {
          imgSrc: "../../lunges.jpg",
          altText: "Lunges",
          title: "Lunges",
          description: "Enhance balance and lower body strength.",
        },
        {
          imgSrc: "../../pushups.jpg",
          altText: "Push-Ups",
          title: "Push-Ups",
          description: "A classic exercise for upper body strength.",
        },
        {
          imgSrc: "../../rowing.jpg",
          altText: "Rowing",
          title: "Rowing",
          description: "Effective for back and arm muscle strength.",
        },
        {
          imgSrc: "../../mountainclimber.jpg",
          altText: "Mountain Climbers",
          title: "Mountain Climbers",
          description: "Boost agility and cardiovascular fitness.",
        },
        {
          imgSrc: "../../burpees.jpg",
          altText: "Burpees",
          title: "Burpees",
          description: "Full-body workout for endurance and strength.",
        },
      ],
    },
    {
      title: "Meal Planning and Nutrition",
      cards: [
        {
          imgSrc: "../../highproteinmeal.jpg",
          altText: "High Protein Meal",
          title: "High Protein Meal",
          description:
            "Boost muscle recovery and growth with lean protein sources.",
        },
        {
          imgSrc: "../../lowcarbmeal.jpg",
          altText: "Low Carb Meal",
          title: "Low Carb Meal",
          description: "Supports weight management and fat loss goals.",
        },
        {
          imgSrc: "../../preworkoutsnack.jpg",
          altText: "Pre-Workout Snack",
          title: "Pre-Workout Snack",
          description: "Fuel workouts with a mix of carbs and protein.",
        },
        {
          imgSrc: "../../postworkoutmeal.jpg",
          altText: "Post-Workout Meal",
          title: "Post-Workout Meal",
          description: "Replenish energy and repair muscles after exercise.",
        },
      ],
    },
    {
      title: "Safety",
      cards: [
        {
          imgSrc: "../../firstaidkit.jpg",
          altText: "First Aid",
          title: "First Aid Kit",
          description: "Ensure a well-stocked first aid kit is always available.",
        },
        {
          imgSrc: "../../spotterassistance.jpg",
          altText: "Spotter Assistance",
          title: "Spotter Assistance",
          description: "Provide help during heavy lifting to prevent injuries.",
        },
        {
          imgSrc: "../../streching.jpg",
          altText: "Stretching",
          title: "Stretching",
          description:
            "Reduce injury risks with pre- and post-workout stretching.",
        },
        {
          imgSrc: "../../stayhydrated.jpg",
          altText: "Stay Hydrated",
          title: "Stay Hydrated",
          description: "Encourage adequate water intake during workouts.",
        },
      ],
    },
  ];

  return (
    <div>
      <header>
        <h1>Trainer's Cheat Sheet</h1>
        <p>Quick reference for essential gym details</p>
      </header>
      <main>
        {categories.map((category, index) => (
          <Category key={index} title={category.title} cards={category.cards} />
        ))}
      </main>
      <footer>
        <p>&copy; 2024 Your Gym. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;
