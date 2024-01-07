<body>
  <h2>Computer_XO Class Documentation</h2>
  <h3>Overview</h3>
  <p>The <code>Computer_XO</code> class represents a tic-tac-toe computer player that utilizes the minimax algorithm to determine the best move for the "O" player in a given tic-tac-toe board configuration. The class includes methods for setting the player and board, evaluating the current state of the board, implementing the minimax algorithm, and determining the best move for the "O" player.</p>
  <h3>Class Methods</h3>
  <h4>Constructor</h4>
  <pre><code>constructor(board = [], player = "O")</code></pre>
  <ul>
    <li><strong>Parameters:</strong>
      <ul>
        <li><code>board</code> (optional): A 2D array representing the current tic-tac-toe board. Default is an empty board.</li>
        <li><code>player</code> (optional): A string representing the player ("X" or "O") for whom the computer is making moves. Default is "O".</li>
      </ul>
    </li>
  </ul>
  <h4><code>setPlayer(player)</code></h4>
  <pre><code>setPlayer(player)</code></pre>
  <ul>
    <li><strong>Parameters:</strong>
      <ul>
        <li><code>player</code>: A string representing the player ("X" or "O") for whom the computer is making moves.</li>
      </ul>
    </li>
    <li><strong>Description:</strong> Sets the player for whom the computer is making moves.</li>
  </ul>
  <h4><code>setBoard(board)</code></h4>
  <pre><code>setBoard(board)</code></pre>
  <ul>
    <li><strong>Parameters:</strong>
      <ul>
        <li><code>board</code>: A 2D array representing the current tic-tac-toe board.</li>
      </ul>
    </li>
    <li><strong>Description:</strong> Sets the current tic-tac-toe board.</li>
  </ul>
  <h4><code>input(board, player)</code></h4>
  <pre><code>input(board, player = this.player)</code></pre>
  <ul>
    <li><strong>Parameters:</strong>
      <ul>
        <li><code>board</code>: A 2D array representing the current tic-tac-toe board.</li>
        <li><code>player</code> (optional): A string representing the player ("X" or "O") for whom the computer is making moves. Default is the player set in the constructor.</li>
      </ul>
    </li>
    <li><strong>Description:</strong> Takes the current board state and player, sets them in the class instance, and returns the best moves for the "O" player using the <code>allBestMoves</code> method.</li>
  </ul>
  <h4><code>isBoardFull()</code></h4>
  <pre><code>isBoardFull()</code></pre>
  <ul>
    <li><strong>Returns:</strong> <code>true</code> if the board is full, <code>false</code> otherwise.</li>
    <li><strong>Description:</strong> Checks if the tic-tac-toe board is full.</li>
  </ul>
  <h4><code>evaluate()</code></h4>
  <pre><code>evaluate()</code></pre>
  <ul>
    <li><strong>Returns:</strong> An object with the properties <code>winner</code> (the winning player) and <code>line</code> (the line in which the winning combination occurred). Returns <code>null</code> if there is no winner.</li>
    <li><strong>Description:</strong> Evaluates the current state of the board and determines if there is a winner.</li>
  </ul>
  <h4><code>minimax(depth, isMaximizing)</code></h4>
  <pre><code>minimax(depth, isMaximizing)</code></pre>
  <ul>
    <li><strong>Parameters:</strong>
      <ul>
        <li><code>depth</code>: The depth of the current recursive call.</li>
        <li><code>isMaximizing</code>: A boolean indicating whether it is the maximizing player's turn.</li>
      </ul>
    </li>
    <li><strong>Returns:</strong> The score for the current board configuration.</li>
    <li><strong>Description:</strong> Implements the minimax algorithm to determine the score for the current board configuration.</li>
  </ul>
  <h4><code>allBestMoves()</code></h4>
  <pre><code>allBestMoves()</code></pre>
  <ul>
    <li><strong>Returns:</strong> An array of objects representing the best moves for the "O" player.</li>
    <li><strong>Description:</strong> Finds and returns all the best moves for the "O" player using the minimax algorithm.</li>
  </ul>
  <h3>Example Usage</h3>
  <pre>
    <code>const computer = new Computer_XO();
computer.setPlayer("O");

const board = [
  ["O", "", "X"],
  ["", "X", ""],
  ["O", "", ""]
];

console.log(computer.input(board, "O"));</code>
  </pre>
</body>