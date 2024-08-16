import { ReactElement } from "react";
import "./About.css"

export function About():ReactElement{
    return (
        <div className="about-container">
          <h1>About Cocktail Wiki</h1>
          
          <div className="about-content">
            <p>
              Welcome to <strong>Cocktail Wiki</strong>, your ultimate guide to the world of cocktails! Whether you're a seasoned mixologist or just starting out, this application is here to inspire your next cocktail creation. With a vast database of cocktails, you can discover new drinks, learn about their ingredients, and master the art of mixing.
            </p>
    
            <p>
              Our goal is to provide you with easy access to detailed cocktail recipes, including the ingredients, measurements, and the proper glassware for serving. You can explore random cocktails or search for specific drinks using our simple interface. Each time you click "Generate Random Cocktail," you'll be introduced to a new drink, adding an element of surprise and excitement to your mixology adventures.
            </p>
    
            <h2>How to Use Cocktail Wiki</h2>
            <ul>
              <li>Navigate to the "home" page to explore a list of available cocktails.</li>
              <li>Click on "Generate Random Cocktail" to discover a new drink.</li>
              <li>Click on See more on cocktail card to view detailed information, including ingredients, measurements, and instructions.</li>
              <li>Visit the "About" page to learn more about our application.</li>
            </ul>
    
            <h2>Why Cocktails?</h2>
            <p>
              Cocktails have a rich history that dates back to the early 19th century. They are more than just mixed drinks; they are a form of art, a way to express creativity and enjoy a social experience. Whether it's a classic Martini or a modern creation, cocktails bring people together and celebrate the joy of mixing flavors.
            </p>
    
            <p>
              We hope that <strong>Cocktail Wiki</strong> becomes your go-to resource for all things cocktails. Explore, experiment, and enjoy the world of mixology!
            </p>
    
            <p className="signature">Cheers,</p>
            <p className="signature">The Cocktail Wiki Team</p>
          </div>
        </div>
      );
}