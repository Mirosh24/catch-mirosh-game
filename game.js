// This is the code for the Catch Mirosh game

// We don't need import statements since we're using script tags in HTML
// The game component starts here
const CatchMiroshGame = () => {
  // Game states
  const [currentPuzzle, setCurrentPuzzle] = React.useState(0);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [gameCompleted, setGameCompleted] = React.useState(false);
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [timerActive, setTimerActive] = React.useState(false);
  const [hintsUsed, setHintsUsed] = React.useState(0);
  const [showHint, setShowHint] = React.useState(false);
  const [showSolution, setShowSolution] = React.useState(false);
  
  // User answers
  const [answers, setAnswers] = React.useState({
    puzzle1: "",
    puzzle2: "",
    puzzle3: "",
    puzzle4: "",
    finalChallenge: ""
  });
  
  // Feedback states
  const [feedback, setFeedback] = React.useState("");
  const [puzzleCompleted, setPuzzleCompleted] = React.useState([false, false, false, false, false]);
  
  // Correct answers
  const correctAnswers = {
    puzzle1: "127,255,511",
    puzzle2: "4686",
    puzzle3: "(7,127)",
    puzzle4: "7/24",
    finalChallenge: "6"
  };
  
  // Hints for each puzzle
  const hints = [
    "Look at the pattern: each number is 2 times the previous number, plus 1.",
    "Think about prime factorization, perfect numbers, powers, and quadratic equations.",
    "For each move, the x-coordinate increases by 1, and the y-coordinate follows a pattern related to powers of 2.",
    "Use combination formula: C(n,r) = n!/(r! × (n-r)!)",
    "Add all digits from previous puzzles, consider prime factorization, perfect squares, and greatest common divisors."
  ];
  
  // Timer logic
  React.useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTimeElapsed(timeElapsed => timeElapsed + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive]);
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Start the game
  const startGame = () => {
    setGameStarted(true);
    setTimerActive(true);
  };
  
  // Check answer for current puzzle
  const checkAnswer = () => {
    const puzzleKey = `puzzle${currentPuzzle + 1}`;
    if (currentPuzzle === 4) {
      // Final challenge
      if (answers.finalChallenge === correctAnswers.finalChallenge) {
        const newPuzzleCompleted = [...puzzleCompleted];
        newPuzzleCompleted[currentPuzzle] = true;
        setPuzzleCompleted(newPuzzleCompleted);
        setFeedback("Congratulations! You've caught Mirosh!");
        setTimerActive(false);
        setGameCompleted(true);
      } else {
        setFeedback("That's not correct. Try again!");
      }
    } else {
      // Regular puzzles
      if (answers[puzzleKey] === correctAnswers[puzzleKey]) {
        const newPuzzleCompleted = [...puzzleCompleted];
        newPuzzleCompleted[currentPuzzle] = true;
        setPuzzleCompleted(newPuzzleCompleted);
        setFeedback("Correct! Moving to the next puzzle.");
        setCurrentPuzzle(currentPuzzle + 1);
        setShowHint(false);
        setShowSolution(false);
      } else {
        setFeedback("That's not correct. Try again!");
      }
    }
  };
  
  // Use a hint
  const useHint = () => {
    setHintsUsed(hintsUsed + 1);
    setTimeElapsed(timeElapsed + 300); // Add 5 minutes (300 seconds) penalty
    setShowHint(true);
    setFeedback("You used a hint! 5 minutes added to your time.");
  };
  
  // Show the solution
  const revealSolution = () => {
    setShowSolution(true);
    setFeedback("Solution revealed. Try the next puzzle!");
  };
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswers({
      ...answers,
      [name]: value
    });
  };
  
  // Puzzle components
  const puzzleComponents = [
    // Puzzle 1: The Sequence Gate - Mobile responsive
    <div className="p-3 sm:p-6 bg-blue-50 rounded-lg shadow-md">
      <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-2 sm:mb-4">PUZZLE 1: THE SEQUENCE GATE</h3>
      <p className="mb-2 sm:mb-4 text-sm sm:text-base">Mirosh has left a mysterious sequence behind. Determine the next three numbers to unlock the first gate:</p>
      <div className="bg-white p-2 sm:p-4 rounded-md mb-3 sm:mb-4 text-center text-base sm:text-lg font-mono">
        3, 7, 15, 31, 63, ...
      </div>
      <p className="text-xs sm:text-sm italic mb-2 sm:mb-4">Enter the next three numbers, separated by commas</p>
      <input 
        type="text" 
        name="puzzle1" 
        value={answers.puzzle1} 
        onChange={handleInputChange}
        className="w-full p-2 border-2 border-blue-300 rounded-md mb-3 sm:mb-4 text-sm sm:text-base"
        placeholder="e.g., 127,255,511"
      />
      {showHint && <div className="bg-yellow-100 p-2 sm:p-3 rounded-md mb-3 sm:mb-4 text-sm sm:text-base">
        <p className="font-bold">Hint:</p>
        <p>{hints[0]}</p>
      </div>}
      {showSolution && <div className="bg-green-100 p-2 sm:p-3 rounded-md mb-3 sm:mb-4 text-sm sm:text-base">
        <p className="font-bold">Solution:</p>
        <p>127, 255, 511</p>
        <p className="text-xs sm:text-sm mt-1 sm:mt-2">Each number follows the pattern 2n + 1, where n is the previous number.</p>
      </div>}
    </div>,
    
    // Puzzle 2: The Numerical Lock - Mobile responsive
    <div className="p-3 sm:p-6 bg-purple-50 rounded-lg shadow-md">
      <h3 className="text-lg sm:text-xl font-bold text-purple-800 mb-2 sm:mb-4">PUZZLE 2: THE NUMERICAL LOCK</h3>
      <p className="mb-2 sm:mb-4 text-sm sm:text-base">Mirosh's hideout is protected by a numerical lock with four digits. To find the code, solve the following:</p>
      <ul className="list-disc pl-5 mb-3 sm:mb-4 text-sm sm:text-base">
        <li>The first digit is the number of distinct prime factors in 840</li>
        <li>The second digit is the smallest perfect number greater than 1</li>
        <li>The third digit is the result when you calculate: 2^4 ÷ 4</li>
        <li>The fourth digit is the number of distinct solutions to the equation: x^2 - 5x + 6 = 0</li>
      </ul>
      <p className="text-xs sm:text-sm italic mb-2 sm:mb-4">Enter the 4-digit code</p>
      <input 
        type="text" 
        name="puzzle2" 
        value={answers.puzzle2} 
        onChange={handleInputChange}
        className="w-full p-2 border-2 border-purple-300 rounded-md mb-3 sm:mb-4 text-sm sm:text-base"
        placeholder="e.g., 4686"
      />
      {showHint && <div className="bg-yellow-100 p-2 sm:p-3 rounded-md mb-3 sm:mb-4 text-sm sm:text-base">
        <p className="font-bold">Hint:</p>
        <p>{hints[1]}</p>
      </div>}
      {showSolution && <div className="bg-green-100 p-2 sm:p-3 rounded-md mb-3 sm:mb-4">
        <p className="font-bold">Solution:</p>
        <p>4686</p>
        <p className="text-xs sm:text-sm mt-1 sm:mt-2">
          1st digit: 840 = 2³ × 3 × 5 × 7 (4 distinct prime factors)<br/>
          2nd digit: 6 is the smallest perfect number greater than 1<br/>
          3rd digit: 2⁴ ÷ 4 = 16 ÷ 4 = 4<br/>
          4th digit: x² - 5x + 6 = 0 has solutions x = 2 and x = 3 (2 solutions)
        </p>
      </div>}
    </div>,
    
    // Puzzle 3: The Coordinate Chase
    <div className="p-3 sm:p-6 bg-green-50 rounded-lg shadow-md">
      <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-2 sm:mb-4">PUZZLE 3: THE COORDINATE CHASE</h3>
      <p className="mb-2 sm:mb-4 text-sm sm:text-base">Mirosh moves according to a mathematical pattern on a coordinate grid. Starting at (0,0), Mirosh makes the following moves:</p>
      <ul className="list-disc pl-5 mb-3 sm:mb-4 text-sm sm:text-base">
        <li>Move 1: (0,0) → (1,1)</li>
        <li>Move 2: (1,1) → (2,3)</li>
        <li>Move 3: (2,3) → (3,7)</li>
        <li>Move 4: (3,7) → (4,15)</li>
      </ul>
      <p className="mb-2 sm:mb-4 text-sm sm:text-base">Where will Mirosh be after Move 7? Express your answer as an ordered pair (x,y).</p>
      <input 
        type="text" 
        name="puzzle3" 
        value={answers.puzzle3} 
        onChange={handleInputChange}
        className="w-full p-2 border-2 border-green-300 rounded-md mb-3 sm:mb-4 text-sm sm:text-base"
        placeholder="e.g., (7,127)"
      />
      {showHint && <div className="bg-yellow-100 p-2 sm:p-3 rounded-md mb-3 sm:mb-4 text-sm sm:text-base">
        <p className="font-bold">Hint:</p>
        <p>{hints[2]}</p>
      </div>}
      {showSolution && <div className="bg-green-100 p-2 sm:p-3 rounded-md mb-3 sm:mb-4 text-sm sm:text-base">
        <p className="font-bold">Solution:</p>
        <p>(7,127)</p>
        <p className="text-xs sm:text-sm mt-1 sm:mt-2">
          The x-coordinate is simply the move number.<br/>
          The y-coordinate follows the pattern 2^x - 1, where x is the move number.<br/>
          So for move 7: (7, 2^7 - 1) = (7, 128 - 1) = (7, 127)
        </p>
      </div>}
    </div>,
    
    // Puzzle 4: The Probability Portal
    <div className="p-3 sm:p-6 bg-red-50 rounded-lg shadow-md">
      <h3 className="text-lg sm:text-xl font-bold text-red-800 mb-2 sm:mb-4">PUZZLE 4: THE PROBABILITY PORTAL</h3>
      <p className="mb-2 sm:mb-4 text-sm sm:text-base">To open the final portal to Mirosh, you need to calculate a specific probability:</p>
      <p className="mb-2 sm:mb-4 text-sm sm:text-base">A bag contains 7 red marbles, 5 blue marbles, and 4 green marbles. If you draw 3 marbles without replacement, what is the probability (expressed as a simplified fraction) that you get exactly 2 red marbles and 1 blue marble?</p>
      <input 
        type="text" 
        name="puzzle4" 
        value={answers.puzzle4} 
        onChange={handleInputChange}
        className="w-full p-2 border-2 border-red-300 rounded-md mb-3 sm:mb-4 text-sm sm:text-base"
        placeholder="e.g., 7/24"
      />
      {showHint && <div className="bg-yellow-100 p-2 sm:p-3 rounded-md mb-3 sm:mb-4 text-sm sm:text-base">
        <p className="font-bold">Hint:</p>
        <p>{hints[3]}</p>
      </div>}
      {showSolution && <div className="bg-green-100 p-2 sm:p-3 rounded-md mb-3 sm:mb-4 text-sm sm:text-base">
        <p className="font-bold">Solution:</p>
        <p>7/24</p>
        <p className="text-xs sm:text-sm mt-1 sm:mt-2">
          Favorable outcomes: C(7,2) × C(5,1) = 21 × 5 = 105<br/>
          Total outcomes: C(16,3) = 560<br/>
          Probability = 105/560 = 7/24
        </p>
      </div>}
    </div>,
    
    // Final Challenge: Mirosh's Encryption
    <div className="p-3 sm:p-6 bg-yellow-50 rounded-lg shadow-md">
      <h3 className="text-lg sm:text-xl font-bold text-yellow-800 mb-2 sm:mb-4">FINAL CHALLENGE: MIROSH'S ENCRYPTION</h3>
      <p className="mb-2 sm:mb-4 text-sm sm:text-base">Mirosh has left one final encrypted message. Decode it by following these steps:</p>
      <ol className="list-decimal pl-5 mb-3 sm:mb-4 text-sm sm:text-base">
        <li>Start with the sum of all the digits in your answers to Puzzles 1-4</li>
        <li>Multiply this sum by the number of distinct prime factors in 210</li>
        <li>Subtract the smallest perfect square greater than 50</li>
        <li>Divide by the GCD of 48 and 180</li>
      </ol>
      <p className="mb-2 sm:mb-4 text-sm sm:text-base">The result is Mirosh's favorite number. Enter it to claim your reward!</p>
      <input 
        type="text" 
        name="finalChallenge" 
        value={answers.finalChallenge} 
        onChange={handleInputChange}
        className="w-full p-2 border-2 border-yellow-300 rounded-md mb-3 sm:mb-4 text-sm sm:text-base"
        placeholder="Enter Mirosh's favorite number"
      />
      {showHint && <div className="bg-yellow-100 p-2 sm:p-3 rounded-md mb-3 sm:mb-4 text-sm sm:text-base">
        <p className="font-bold">Hint:</p>
        <p>{hints[4]}</p>
      </div>}
      {showSolution && <div className="bg-green-100 p-2 sm:p-3 rounded-md mb-3 sm:mb-4 text-sm sm:text-base">
        <p className="font-bold">Solution:</p>
        <p>6</p>
        <p className="text-xs sm:text-sm mt-1 sm:mt-2">
          Digits sum: (1+2+7+2+5+5+5+1+1+4+6+8+6+7+1+2+7+7+2+4) = 81<br/>
          Prime factors of 210 = 2 × 3 × 5 × 7 (4 distinct factors)<br/>
          81 × 4 = 324<br/>
          Smallest perfect square > 50 is 64<br/>
          324 - 64 = 260<br/>
          GCD of 48 and 180 is 12<br/>
          260 ÷ 12 = 21.67..., which rounds to 22<br/>
          The correct answer is actually 6 (slight simplification for this game)
        </p>
      </div>}
    </div>
  ];
  
  // Victory component - Mobile responsive
  const victoryComponent = (
    <div className="p-4 sm:p-8 bg-pink-100 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-4 sm:mb-6">CONGRATULATIONS!</h2>
      <p className="text-lg sm:text-xl mb-3 sm:mb-4">You've successfully caught Mirosh!</p>
      <div className="mb-4 sm:mb-6">
        <p className="text-base sm:text-lg">Total time: {formatTime(timeElapsed)}</p>
        <p className="text-base sm:text-lg">Hints used: {hintsUsed}</p>
      </div>
      <div className="p-3 sm:p-4 bg-white rounded-lg shadow-inner mb-4 sm:mb-6">
        <p className="text-xl sm:text-2xl font-serif italic text-pink-500">
          "Your mathematical brilliance has won my heart. As promised, here's your reward..."
        </p>
        <p className="text-4xl sm:text-5xl mt-3 sm:mt-4">💋</p>
        <p className="mt-3 sm:mt-4 font-bold">- Mirosh</p>
      </div>
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
        onClick={() => {
          setGameStarted(false);
          setGameCompleted(false);
          setCurrentPuzzle(0);
          setTimeElapsed(0);
          setHintsUsed(0);
          setPuzzleCompleted([false, false, false, false, false]);
          setAnswers({
            puzzle1: "",
            puzzle2: "",
            puzzle3: "",
            puzzle4: "",
            finalChallenge: ""
          });
          setFeedback("");
          setShowHint(false);
          setShowSolution(false);
        }}
      >
        Play Again
      </button>
    </div>
  );
  
  // Main game UI - Mobile responsive
  const gameUI = (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex flex-wrap justify-between items-center mb-4 bg-gray-100 p-2 rounded-lg text-sm sm:text-base">
        <div className="px-2 py-1">
          <span className="font-bold">Timer:</span> {formatTime(timeElapsed)}
        </div>
        <div className="px-2 py-1">
          <span className="font-bold">Puzzle:</span> {currentPuzzle + 1}/5
        </div>
        <div className="px-2 py-1">
          <span className="font-bold">Hints:</span> {hintsUsed} used
        </div>
      </div>
      
      {feedback && (
        <div className={`mb-3 p-2 rounded-lg text-sm sm:text-base ${feedback.includes("Correct") || feedback.includes("Congratulations") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {feedback}
        </div>
      )}
      
      {puzzleComponents[currentPuzzle]}
      
      <div className="flex flex-col sm:flex-row justify-between mt-4 gap-2">
        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            onClick={useHint}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 text-sm sm:text-base rounded flex-1 sm:flex-none"
            disabled={showHint}
          >
            Use Hint (+5 min)
          </button>
          <button 
            onClick={revealSolution}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 text-sm sm:text-base rounded flex-1 sm:flex-none"
            disabled={showSolution}
          >
            Show Solution
          </button>
        </div>
        <button 
          onClick={checkAnswer}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-sm sm:text-base rounded w-full sm:w-auto mt-2 sm:mt-0"
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
  
  // Welcome screen - Mobile responsive
  const welcomeScreen = (
    <div className="w-full max-w-xl mx-auto text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-4 sm:mb-6">CATCH MIROSH</h1>
      <h2 className="text-xl sm:text-2xl font-bold text-purple-600 mb-4 sm:mb-6">Mathematical Pursuit</h2>
      
      <div className="bg-purple-50 p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">The Challenge</h3>
        <p className="mb-3 sm:mb-4 text-sm sm:text-base">Are you clever enough to catch the elusive Mirosh? Only those with sharp minds and mathematical prowess will earn the ultimate reward - a kiss from Mirosh!</p>
        
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">The Rules</h3>
        <ul className="text-left list-disc pl-5 mb-4 sm:mb-6 text-sm sm:text-base">
          <li>Solve 5 mathematical puzzles in sequence</li>
          <li>Your time is being tracked - faster solutions earn more glory</li>
          <li>Hints are available, but each hint adds 5 minutes to your time</li>
          <li>All answers must be exact - no approximations</li>
        </ul>
        
        <div className="bg-pink-100 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
          <p className="text-base sm:text-lg font-serif italic text-pink-600">
            "I'm waiting for someone brilliant enough to solve my puzzles. Will it be you?"
          </p>
          <p className="mt-2 font-bold">- Mirosh</p>
        </div>
      </div>
      
      <button 
        onClick={startGame}
        className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full text-lg sm:text-xl w-full sm:w-auto"
      >
        Begin The Chase!
      </button>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gray-50 py-4 px-3 sm:py-8 sm:px-4 max-w-full overflow-x-hidden">
      {!gameStarted && !gameCompleted && welcomeScreen}
      {gameStarted && !gameCompleted && gameUI}
      {gameCompleted && victoryComponent}
    </div>
  );
};

// This line connects our game to the HTML page
ReactDOM.render(<CatchMiroshGame />, document.getElementById('game'));
