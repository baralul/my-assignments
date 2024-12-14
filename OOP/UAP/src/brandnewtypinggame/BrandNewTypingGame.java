import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
import javafx.application.Platform;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.input.KeyCode;
import javafx.stage.Stage;
import javafx.util.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import javafx.geometry.Pos;
import javafx.scene.layout.HBox;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;

public class RainTyping extends Application {

    private Pane root;
    private Pane pauseMenu;
    private final List<Label> fallingTexts = new ArrayList<>();
    private Label focusedText = null;
    private Label healthLabel;
    private Label scoreLabel;
    private Label playerModeLabel;
    private final Random random = new Random();
    private int score = 0;
    private int health = 5;
    private int highestScore = 0;
    private double fallingSpeed = 0.5;
    private Timeline fallingTimeline;
    private Timeline spawnTimeline;
    private boolean isMultiplayer = false;
    private boolean isPaused = false;
    private boolean isWordFocused = false;
    private int currentPlayer = 1;
    private int player1Score = 0;
    private int player2Score = 0;
    private int correctLetters = 0;
    private int totalTypedLetters = 0;


    @Override
    public void start(Stage primaryStage) {
        showMainMenu(primaryStage);

        
        primaryStage.setOnCloseRequest(e -> {
            stopAllTimelines(); 
            Platform.exit();    
            System.exit(0);     
        });
    }
    
    private void styleButton(Button button) {
    button.setStyle(
        "-fx-background-color: #4CAF50;" +  
        "-fx-text-fill: white;" +           
        "-fx-font-size: 18px;" +           
        "-fx-font-weight: bold;" +          
        "-fx-padding: 10px 20px;" +         
        "-fx-background-radius: 10px;" +    
        "-fx-cursor: hand;"                 
    );

    // Hover effect
    button.setOnMouseEntered(e -> button.setStyle(
        "-fx-background-color: #45a049;" +  
        "-fx-text-fill: white;" +
        "-fx-font-size: 18px;" +
        "-fx-font-weight: bold;" +
        "-fx-padding: 10px 20px;" +
        "-fx-background-radius: 10px;" +
        "-fx-cursor: hand;"
    ));

    button.setOnMouseExited(e -> button.setStyle(
        "-fx-background-color: #4CAF50;" +
        "-fx-text-fill: white;" +
        "-fx-font-size: 18px;" +
        "-fx-font-weight: bold;" +
        "-fx-padding: 10px 20px;" +
        "-fx-background-radius: 10px;" +
        "-fx-cursor: hand;"
    ));
}



private void showMainMenu(Stage primaryStage) {
    stopAllTimelines();

    StackPane root = new StackPane(); 
    Scene scene = new Scene(root, 800, 600); 
    root.setStyle("-fx-background-color: linear-gradient(to bottom, #000000, #1a1a1a);");

    VBox menuBox = new VBox(30); 
    menuBox.setAlignment(Pos.CENTER); 

    
    Label title = new Label("Rain Typing");
    title.setTextFill(Color.WHITE);
    title.setFont(new Font(50)); 

    
    Button singlePlayerButton = new Button("Single Player");
    singlePlayerButton.setOnAction(e -> startGame(primaryStage, false));
    styleButton(singlePlayerButton);
    singlePlayerButton.setPrefWidth(200);

    
    Button multiplayerButton = new Button("Multiplayer");
    multiplayerButton.setOnAction(e -> startGame(primaryStage, true));
    styleButton(multiplayerButton);
    multiplayerButton.setPrefWidth(200);

   
    Button exitButton = new Button("Exit Game");
    exitButton.setOnAction(e -> {
        
        stopAllTimelines();
        Platform.exit();
        System.exit(0);
    });
    styleButton(exitButton);
    exitButton.setPrefWidth(200);

    menuBox.getChildren().addAll(title, singlePlayerButton, multiplayerButton, exitButton);
    root.getChildren().add(menuBox);

    primaryStage.setScene(scene);
    primaryStage.setTitle("Rain Typing");
    primaryStage.show();
}

    private void startGame(Stage primaryStage, boolean multiplayer) {
    stopAllTimelines(); 

    isMultiplayer = multiplayer;
    score = 0;
    health = 5;
    fallingSpeed = 0.5;
    currentPlayer = 1;
    correctLetters = 0;
    totalTypedLetters = 0;
    fallingTexts.clear();

    root = new Pane(); 
    Scene scene = new Scene(root, 800, 600);
    root.setStyle("-fx-background-color: linear-gradient(to bottom, #000000, #1a1a1a);");

    playerModeLabel = new Label(isMultiplayer ? "Multiplayer - Player " + currentPlayer : "Single Player");
    playerModeLabel.setTextFill(Color.WHITE);
    playerModeLabel.setFont(new Font(16));

    healthLabel = new Label("Health: " + health);
    healthLabel.setTextFill(Color.WHITE);
    healthLabel.setFont(new Font(16));

    scoreLabel = new Label("Score: 0");
    scoreLabel.setTextFill(Color.WHITE);
    scoreLabel.setFont(new Font(16));

    HBox bottomPanel = new HBox(20);
    bottomPanel.setAlignment(Pos.CENTER);
    bottomPanel.layoutYProperty().bind(scene.heightProperty().subtract(50)); 
    bottomPanel.setPrefHeight(50);
    bottomPanel.setStyle("-fx-background-color: rgba(0, 0, 0, 0.7);");

    bottomPanel.getChildren().addAll(playerModeLabel, healthLabel, scoreLabel);
    root.getChildren().add(bottomPanel);

    spawnTimeline = new Timeline(new KeyFrame(Duration.seconds(0.8), e -> spawnText(primaryStage)));
    spawnTimeline.setCycleCount(Timeline.INDEFINITE);
    spawnTimeline.play();

    fallingTimeline = new Timeline(new KeyFrame(Duration.millis(50), e -> updateFallingTexts(primaryStage)));
    fallingTimeline.setCycleCount(Timeline.INDEFINITE);
    fallingTimeline.play();

    setupPauseMenu(primaryStage);
    scene.setOnKeyPressed(event -> handleKeyPress(event, primaryStage)); 
    scene.setOnKeyTyped(this::handleTyping); 

    primaryStage.setScene(scene); 
    primaryStage.setTitle("Typing Rain");
    primaryStage.show();
}

    private void resetFocusForNextPlayer() {
    focusedText = null;
    isWordFocused = false;
}

private void setupPauseMenu(Stage primaryStage) {
    pauseMenu = new Pane();
    pauseMenu.setStyle("-fx-background-color: rgba(0, 0, 0, 0.8);");
    pauseMenu.setVisible(false);
    pauseMenu.setPrefSize(primaryStage.getScene().getWidth(), primaryStage.getScene().getHeight());

    VBox pauseBox = new VBox(20);
    pauseBox.setAlignment(Pos.CENTER);
    
    pauseBox.layoutXProperty().bind(pauseMenu.widthProperty().subtract(pauseBox.widthProperty()).divide(2));
    pauseBox.layoutYProperty().bind(pauseMenu.heightProperty().subtract(pauseBox.heightProperty()).divide(2));

    Label pauseLabel = new Label("Game Paused");
    pauseLabel.setTextFill(Color.WHITE);
    pauseLabel.setFont(new Font(30));

    Button resumeButton = new Button("Resume Game");
    resumeButton.setOnAction(e -> resumeGame());
    styleButton(resumeButton);

    Button restartButton = new Button("Restart Game");
    restartButton.setOnAction(e -> restartGame(primaryStage));
    styleButton(restartButton);

    Button mainMenuButton = new Button("Main Menu");
    mainMenuButton.setOnAction(e -> {
        stopAllTimelines();
        fallingTexts.clear();
        focusedText = null;
        root.getChildren().clear();
        showMainMenu(primaryStage);
    });
    styleButton(mainMenuButton);

    pauseBox.getChildren().addAll(pauseLabel, resumeButton, restartButton, mainMenuButton);
    pauseMenu.getChildren().add(pauseBox);
    root.getChildren().add(pauseMenu);
}

    private void handleKeyPress(KeyEvent event, Stage primaryStage) {
        if (event.getCode() == KeyCode.ESCAPE) {
            if (!isPaused) {
                pauseGame();
            } else {
                resumeGame();
            }
        }
    }

    private void spawnText(Stage primaryStage) {
    String[] words = {"java", "code", "typing", "game", "fun", "random", "fast", "react", "keyboard", "rain"};
    String randomWord = words[random.nextInt(words.length)];
    Label text = new Label(randomWord);
    text.setTextFill(Color.GREEN);
    text.setFont(new Font(18)); 

    double sceneWidth = primaryStage.getScene().getWidth();
    text.setLayoutX(random.nextInt((int) (sceneWidth - 50))); 
    text.setLayoutY(0);

    fallingTexts.add(text);
    root.getChildren().add(text);
}

    private void pauseGame() {
        isPaused = true;
        spawnTimeline.pause();
        fallingTimeline.pause();
        pauseMenu.setVisible(true);
    }

    private void resumeGame() {
        isPaused = false;
        spawnTimeline.play();
        fallingTimeline.play();
        pauseMenu.setVisible(false);
    }


private void restartGame(Stage primaryStage) {
    stopAllTimelines();

    score = 0;
    health = 5;
    fallingSpeed = 0.5;
    correctLetters = 0;
    totalTypedLetters = 0;

    fallingTexts.clear();
    root.getChildren().clear();
    focusedText = null;
    isWordFocused = false;

    startGame(primaryStage, isMultiplayer);

}

private void updateFallingTexts(Stage primaryStage) {
    List<Label> toRemove = new ArrayList<>();
    double sceneHeight = primaryStage.getScene().getHeight();

    for (Label text : fallingTexts) {
        text.setLayoutY(text.getLayoutY() + fallingSpeed);
        if (text.getLayoutY() > sceneHeight) { 
            toRemove.add(text);
            health--;
            healthLabel.setText("Health: " + health);
            if (health <= 0) {
                endGame(primaryStage);
                return;
            }
        }
    }

    for (Label text : toRemove) {
        fallingTexts.remove(text);
        root.getChildren().remove(text);
    }
}

    private void stopAllTimelines() {
        if (spawnTimeline != null) {
            spawnTimeline.stop();
            spawnTimeline = null; 
        }
        if (fallingTimeline != null) {
            fallingTimeline.stop();
            fallingTimeline = null; 
        }
        System.out.println("All timelines stopped.");
    }

   private void handleTyping(KeyEvent event) {
    System.out.println("Key typed: " + event.getCharacter()); 
    String typed = event.getCharacter().trim();
    
    if (!typed.isEmpty()) {
        totalTypedLetters++;

        if (focusedText != null && focusedText.getText().startsWith(typed)) {
            correctLetters++;
        }

        if (focusedText != null) {
            String currentWord = focusedText.getText();
            if (currentWord.startsWith(typed)) {
                focusedText.setText(currentWord.substring(1));
                if (focusedText.getText().isEmpty()) {
                    handleWordCleared();
                }
            }
        } else {
            for (Label text : fallingTexts) {
                if (text.getText().startsWith(typed) && !isWordFocused) {
                    focusedText = text;
                    focusedText.setTextFill(Color.BLUE);
                    isWordFocused = true;
                    text.setText(text.getText().substring(1));
                    if (focusedText.getText().isEmpty()) {
                        handleWordCleared();
                    }
                    break;
                }
            }
        }
    }
}

private void handleWordCleared() {
    fallingTexts.remove(focusedText);
    root.getChildren().remove(focusedText);
    focusedText = null;
    score++;
    fallingSpeed += 0.05;
    updateScoreLabel();
    isWordFocused = false;

    if (isMultiplayer) {
        if (currentPlayer == 1) {
            player1Score++;
        } else {
            player2Score++;
        }
        updatePlayerModeLabel();
    }
}

 private void updateScoreLabel() {
        if (scoreLabel != null) {
            scoreLabel.setText("Score: " + score);
        }
    }
 
    private void updatePlayerModeLabel() {
        if (playerModeLabel != null && isMultiplayer) {
            playerModeLabel.setText("Multiplayer - Player " + currentPlayer);
        }
    }
        
    private void clearGameElements() {
        fallingTexts.clear();
        root.getChildren().removeIf(node -> node instanceof Label || node instanceof Button);
        focusedText = null;
        isWordFocused = false;
        System.out.println("Game elements cleared.");
    }

private void endGame(Stage primaryStage) {
    stopAllTimelines();

    if (isMultiplayer) {
        if (currentPlayer == 1) {
            // End Player 1's turn
            player1Score = score;
            currentPlayer = 2;
            
           
            health = 5;
            score = 0;
            correctLetters = 0;
            totalTypedLetters = 0;
            fallingTexts.clear();
            
            updatePlayerModeLabel();
            startGame(primaryStage, true); 
        } else {
            player2Score = score;
            showMultiplayerResults(primaryStage);
        }
    } else {
       
        showGameOverScreen(primaryStage);
    }
}

    private void resetScene(Stage primaryStage) {
        root.getChildren().clear(); 
        root = new Pane(); 
        Scene scene = new Scene(root, 600, 400);
        primaryStage.setScene(scene); 
        System.out.println("Scene reset.");
    }

     private void showMultiplayerResults(Stage primaryStage) {
        root = new Pane();
        Scene scene = new Scene(root, 600, 400);
        root.setStyle("-fx-background-color: black;");

        Label resultsLabel = new Label("Multiplayer Results");
        resultsLabel.setFont(new Font(30));
        resultsLabel.setTextFill(Color.WHITE);
        resultsLabel.setLayoutX(150);
        resultsLabel.setLayoutY(50);

        Label player1ScoreLabel = new Label("Player 1 Score: " + player1Score);
        player1ScoreLabel.setFont(new Font(20));
        player1ScoreLabel.setTextFill(Color.WHITE);
        player1ScoreLabel.setLayoutX(150);
        player1ScoreLabel.setLayoutY(150);

        Label player2ScoreLabel = new Label("Player 2 Score: " + player2Score);
        player2ScoreLabel.setFont(new Font(20));
        player2ScoreLabel.setTextFill(Color.WHITE);
        player2ScoreLabel.setLayoutX(150);
        player2ScoreLabel.setLayoutY(200);

        String winner = player1Score > player2Score ? "Player 1 Wins!" : player2Score > player1Score ? "Player 2 Wins!" : "It's a Tie!";
        Label winnerLabel = new Label(winner);
        winnerLabel.setFont(new Font(20));
        winnerLabel.setTextFill(Color.WHITE);
        winnerLabel.setLayoutX(150);
        winnerLabel.setLayoutY(250);
        
          Button restartButton = new Button("Restart Game");
    restartButton.setLayoutX(200);
    restartButton.setLayoutY(300);
    restartButton.setOnAction(e -> {
        stopAllTimelines();
        clearGameElements();
        currentPlayer = 1;
        player1Score = 0;
        player2Score = 0;
        startGame(primaryStage, true);
    });
        styleButton(restartButton);

        Button mainMenuButton = new Button("Main Menu");
        mainMenuButton.setLayoutX(350);
        mainMenuButton.setLayoutY(300);
        mainMenuButton.setOnAction(e -> {
            stopAllTimelines();
            clearGameElements();
            resetScene(primaryStage);
            showMainMenu(primaryStage);
        });
        styleButton(mainMenuButton);

        root.getChildren().addAll(resultsLabel, player1ScoreLabel, player2ScoreLabel, winnerLabel, restartButton, mainMenuButton);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    private void showGameOverScreen(Stage primaryStage) {
        
        StackPane root = new StackPane();
        Scene scene = new Scene(root, 800, 600); 
        root.setStyle("-fx-background-color: black;");

        Label gameOverLabel = new Label("Game Over!");
        gameOverLabel.setFont(new Font(40)); // Ukuran font besar
        gameOverLabel.setTextFill(Color.WHITE);

        Label finalScoreLabel = new Label("Score: " + score);
        finalScoreLabel.setFont(new Font(20));
        finalScoreLabel.setTextFill(Color.WHITE);

        highestScore = Math.max(highestScore, score);
        Label highestScoreLabel = new Label("Highest Score: " + highestScore);
        highestScoreLabel.setFont(new Font(20));
        highestScoreLabel.setTextFill(Color.WHITE);

        double accuracy = (totalTypedLetters == 0) ? 0 : (correctLetters / (double) totalTypedLetters) * 100;
        Label accuracyLabel = new Label(String.format("Accuracy: %.2f%%", accuracy));
        accuracyLabel.setFont(new Font(20));
        accuracyLabel.setTextFill(Color.WHITE);

        Button restartButton = new Button("Restart Game");
        restartButton.setOnAction(e -> {
            stopAllTimelines();
            startGame(primaryStage, isMultiplayer);
        });
        styleButton(restartButton);

        Button mainMenuButton = new Button("Main Menu");
        mainMenuButton.setOnAction(e -> {
            stopAllTimelines();
            showMainMenu(primaryStage);
        });
        styleButton(mainMenuButton);

        VBox layout = new VBox(20); 
        layout.setAlignment(Pos.CENTER); 
        layout.getChildren().addAll(gameOverLabel, finalScoreLabel, highestScoreLabel, accuracyLabel, restartButton, mainMenuButton);

        root.getChildren().add(layout);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

   public static void main(String[] args) {
        launch(args);
    }
}
