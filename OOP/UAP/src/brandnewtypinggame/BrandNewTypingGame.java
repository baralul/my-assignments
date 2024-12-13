import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.stage.Stage;
import javafx.util.Duration;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class BrandNewTypingGame extends Application {

    private Pane root;
    private List<Label> fallingTexts = new ArrayList<>();
    private Label focusedText = null;
    private Random random = new Random();
    private int score = 0;
    private int health = 5;
    private int highScore = 0;
    private double fallingSpeed = 0.5;
    private Timeline fallingTimeline;
    private Timeline spawnTimeline;
    private boolean isMultiplayer = false;
    private int currentPlayer = 1;
    private int player1Score = 0;
    private int player2Score = 0;

    @Override
    public void start(Stage primaryStage) {
        showMainMenu(primaryStage);
    }

    private void showMainMenu(Stage primaryStage) {
        root = new Pane();
        Scene scene = new Scene(root, 600, 400);
        root.setStyle("-fx-background-color: black;");

        Label title = new Label("Typing Game");
        title.setTextFill(Color.WHITE);
        title.setFont(new Font(30));
        title.setLayoutX(200);
        title.setLayoutY(50);

        Button singlePlayerButton = new Button("Single Player");
        singlePlayerButton.setLayoutX(250);
        singlePlayerButton.setLayoutY(150);
        singlePlayerButton.setOnAction(e -> startGame(primaryStage, false));

        Button multiplayerButton = new Button("Multiplayer");
        multiplayerButton.setLayoutX(250);
        multiplayerButton.setLayoutY(200);
        multiplayerButton.setOnAction(e -> startGame(primaryStage, true));

        root.getChildren().addAll(title, singlePlayerButton, multiplayerButton);
        primaryStage.setScene(scene);
        primaryStage.setTitle("Typing Game Main Menu");
        primaryStage.show();
    }

    private void startGame(Stage primaryStage, boolean multiplayer) {
        // Reset game variables for the current round
        isMultiplayer = multiplayer;
        score = 0;
        health = 5;
        fallingSpeed = 0.5;

        // Clear any remaining falling texts
        fallingTexts.clear();
        root = new Pane();

        // Set up the scene
        Scene scene = new Scene(root, 600, 400);
        root.setStyle("-fx-background-color: black;");

        // Add score, health, and high score labels
        Label scoreLabel = new Label("Score: 0");
        scoreLabel.setTextFill(Color.WHITE);
        scoreLabel.setFont(new Font(20));
        scoreLabel.setLayoutX(10);
        scoreLabel.setLayoutY(10);

        Label healthLabel = new Label("Health: 5");
        healthLabel.setTextFill(Color.WHITE);
        healthLabel.setFont(new Font(20));
        healthLabel.setLayoutX(10);
        healthLabel.setLayoutY(40);

        Label highScoreLabel = new Label("High Score: " + highScore);
        highScoreLabel.setTextFill(Color.WHITE);
        highScoreLabel.setFont(new Font(20));
        highScoreLabel.setLayoutX(10);
        highScoreLabel.setLayoutY(70);

        Label playerLabel = new Label("Player " + currentPlayer);
        playerLabel.setTextFill(Color.WHITE);
        playerLabel.setFont(new Font(20));
        playerLabel.setLayoutX(500);
        playerLabel.setLayoutY(10);

        root.getChildren().addAll(scoreLabel, healthLabel, highScoreLabel, playerLabel);

        // Set up timelines
        spawnTimeline = new Timeline(new KeyFrame(Duration.seconds(0.8), e -> spawnText()));
        spawnTimeline.setCycleCount(Timeline.INDEFINITE);
        spawnTimeline.play();

        fallingTimeline = new Timeline(new KeyFrame(Duration.millis(50), e -> updateFallingTexts(scoreLabel, healthLabel, highScoreLabel, primaryStage)));
        fallingTimeline.setCycleCount(Timeline.INDEFINITE);
        fallingTimeline.play();

        // Add keyboard input handling
        scene.setOnKeyTyped(this::handleTyping);

        // Add listeners for layout adjustments
        scene.widthProperty().addListener((obs, oldVal, newVal) -> adjustLayout(scene));
        scene.heightProperty().addListener((obs, oldVal, newVal) -> adjustLayout(scene));

        // Set up the primary stage
        primaryStage.setScene(scene);
        primaryStage.setTitle(isMultiplayer ? "Typing Game - Player " + currentPlayer : "Typing Game");
        primaryStage.show();
    }


    private void spawnText() {
        String[] words = {"java", "code", "typing", "game", "fun", "random", "fast", "react", "keyboard", "rain"};
        String randomWord = words[random.nextInt(words.length)];
        Label text = new Label(randomWord);
        text.setTextFill(Color.GREEN);
        text.setFont(new Font(18));
        text.setLayoutX(random.nextInt((int) root.getWidth() - 50));
        text.setLayoutY(0);
        fallingTexts.add(text);
        root.getChildren().add(text);
    }

    private void updateFallingTexts(Label scoreLabel, Label healthLabel, Label highScoreLabel, Stage primaryStage) {
        List<Label> toRemove = new ArrayList<>();
        for (Label text : fallingTexts) {
            text.setLayoutY(text.getLayoutY() + fallingSpeed);
            if (text.getLayoutY() > root.getHeight()) {
                toRemove.add(text);
                if (text == focusedText) {
                    focusedText = null; // Reset focus if the word disappears
                }
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


    private void handleTyping(KeyEvent event) {
        String typed = event.getCharacter().trim();
        if (!typed.isEmpty()) {
            if (focusedText == null) {
                // If no word is currently focused, find one to focus
                for (Label text : fallingTexts) {
                    if (text.getText().startsWith(typed)) {
                        focusedText = text;
                        focusedText.setTextFill(Color.BLUE); // Highlight the focused word
                        break;
                    }
                }
            } 

            if (focusedText != null) {
                // Handle typing for the focused word
                if (focusedText.getText().startsWith(typed)) {
                    if (focusedText.getText().length() > 1) {
                        focusedText.setText(focusedText.getText().substring(1));
                    } else {
                        // Word is fully typed, remove it
                        fallingTexts.remove(focusedText);
                        root.getChildren().remove(focusedText);
                        focusedText = null;
                        score += 1;
                        fallingSpeed += 0.05; // Gradual speed increase
                        updateScoreLabel();
                    }
                }
            }
        }
    }


    private void updateScoreLabel() {
        for (javafx.scene.Node node : root.getChildren()) {
            if (node instanceof Label && ((Label) node).getText().startsWith("Score:")) {
                ((Label) node).setText("Score: " + score);
            }
        }
    }

    private void adjustLayout(Scene scene) {
        for (Label text : fallingTexts) {
            text.setLayoutX(random.nextInt((int) scene.getWidth() - 50));
        }
    }

    private void endGame(Stage primaryStage) {
        spawnTimeline.stop();
        fallingTimeline.stop();
        highScore = Math.max(highScore, score);

        if (isMultiplayer) {
            if (currentPlayer == 1) {
                // Store Player 1's score and switch to Player 2
                player1Score = score;
                currentPlayer = 2;
                startGame(primaryStage, true);
            } else {
                // Store Player 2's score and display results
                player2Score = score;
                showMultiplayerResults(primaryStage);
            }
        } else {
            // Single-player: Show game over screen
            showGameOverScreen(primaryStage);
        }
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

        Button mainMenuButton = new Button("Main Menu");
        mainMenuButton.setLayoutX(250);
        mainMenuButton.setLayoutY(300);
        mainMenuButton.setOnAction(e -> showMainMenu(primaryStage));

        root.getChildren().addAll(resultsLabel, player1ScoreLabel, player2ScoreLabel, winnerLabel, mainMenuButton);
        primaryStage.setScene(scene);
        primaryStage.show();
    }


    private void showGameOverScreen(Stage primaryStage) {
        root = new Pane();
        Scene scene = new Scene(root, 600, 400);
        root.setStyle("-fx-background-color: black;");

        Label gameOverLabel = new Label("Game Over!");
        gameOverLabel.setFont(new Font(30));
        gameOverLabel.setTextFill(Color.WHITE);
        gameOverLabel.setLayoutX(200);
        gameOverLabel.setLayoutY(100);

        Label finalScoreLabel = new Label("Score: " + score);
        finalScoreLabel.setFont(new Font(20));
        finalScoreLabel.setTextFill(Color.WHITE);
        finalScoreLabel.setLayoutX(200);
        finalScoreLabel.setLayoutY(150);

        Label highScoreLabel = new Label("High Score: " + highScore);
        highScoreLabel.setFont(new Font(20));
        highScoreLabel.setTextFill(Color.WHITE);
        highScoreLabel.setLayoutX(200);
        highScoreLabel.setLayoutY(200);

        Button mainMenuButton = new Button("Main Menu");
        mainMenuButton.setLayoutX(250);
        mainMenuButton.setLayoutY(250);
        mainMenuButton.setOnAction(e -> showMainMenu(primaryStage));

        root.getChildren().addAll(gameOverLabel, finalScoreLabel, highScoreLabel, mainMenuButton);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
