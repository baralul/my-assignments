import javafx.animation.*;
import javafx.application.Application;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.scene.paint.Color;
import javafx.scene.shape.Circle;
import javafx.scene.text.Font;
import javafx.stage.Stage;
import javafx.util.Duration;
import java.io.*;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

abstract class GameConfiguration {
    protected static final Logger LOGGER = Logger.getLogger(GameConfiguration.class.getName());
    protected static final Random RANDOM = new Random();
    
    protected abstract List<String> getWordList();
    
    protected abstract int getGameDuration();
    
    protected abstract int getBonusPoints();
}

class ScoreManager {
    private static final String HIGH_SCORE_FILE = "highscore.txt";
    private int currentScore;
    private int highScore;

    public ScoreManager() {
        loadHighScore();
    }

    public void incrementScore(int points) {
        currentScore += points;
        updateHighScore();
    }

    public void resetScore() {
        currentScore = 0;
    }

    public int getCurrentScore() {
        return currentScore;
    }

    public int getHighScore() {
        return highScore;
    }
 
    private void loadHighScore() {
        try (BufferedReader reader = new BufferedReader(new FileReader(HIGH_SCORE_FILE))) {
            highScore = Integer.parseInt(reader.readLine());
        } catch (IOException | NumberFormatException e) {
            highScore = 0;
        }
    }

    private void updateHighScore() {
        if (currentScore > highScore) {
            highScore = currentScore;
            saveHighScore();
        }
    }

    private void saveHighScore() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(HIGH_SCORE_FILE))) {
            writer.write(String.valueOf(highScore));
        } catch (IOException e) {
        }
    }
}

interface DifficultyStrategy {
    double getWordSpeed();
    int getInitialLives();
}

class EasyDifficulty implements DifficultyStrategy {
    @Override
    public double getWordSpeed() {
        return 5;
    }

    @Override
    public int getInitialLives() {
        return 3;
    }
}

class MediumDifficulty implements DifficultyStrategy {
    @Override
    public double getWordSpeed() {
        return 4;
    }

    @Override
    public int getInitialLives() {
        return 3;
    }
}

class HardDifficulty implements DifficultyStrategy {
    @Override
    public double getWordSpeed() {
        return 3;
    }

    @Override
    public int getInitialLives() {
        return 3;
    }
}

class TypingGameConfiguration extends GameConfiguration {
    private static final List<String> INDONESIAN_WORDS = Arrays.asList(
        "apel", "pisang", "ceri", "durian", "jeruk", "anggur",
        "kucing", "anjing", "gajah", "rubah", "harimau", "kuda",
        "komputer", "layar", "internet", "tetikus", "papan ketik"
    );

    @Override
    protected List<String> getWordList() {
        return INDONESIAN_WORDS;
    }

    @Override
    protected int getGameDuration() {
        return 30;
    }

    @Override
    protected int getBonusPoints() {
        return 5;
    }
}

public class TypingGame extends Application {
    private Label wordLabel;
    private TextField inputField;
    private Label timerLabel;
    private Label scoreLabel;
    private Label livesLabel;
    private Label highScoreLabel;
    private ComboBox<String> difficultyBox;
    private Button startButton;

    private String currentWord;
    private int score = 0;
    private int lives = 3;
    private int timeLeft;
    private boolean isGameRunning = false;

    private TypingGameConfiguration gameConfig;
    private ScoreManager scoreManager;
    private DifficultyStrategy currentDifficulty;

    private Timeline gameTimeline;
    private TranslateTransition wordAnimation;

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) {
        gameConfig = new TypingGameConfiguration();
        scoreManager = new ScoreManager();

        Scene scene = new Scene(createMainLayout(primaryStage), 800, 600);
        primaryStage.setTitle("Permainan Ketik");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    private VBox createMainLayout(Stage primaryStage) {
        wordLabel = new Label("");
        wordLabel.setFont(Font.font("Comic Sans MS", 30));
        wordLabel.setTextFill(Color.WHITE);

        inputField = new TextField();
        inputField.setDisable(true);
        inputField.setOnAction(e -> checkInput());

        timerLabel = new Label("Waktu: " + gameConfig.getGameDuration() + " detik");
        timerLabel.setFont(Font.font("Verdana", 20));
        timerLabel.setTextFill(Color.WHITE);

        scoreLabel = new Label("Skor: 0");
        scoreLabel.setFont(Font.font("Verdana", 20));
        scoreLabel.setTextFill(Color.WHITE);

        livesLabel = new Label("Nyawa: 3");
        livesLabel.setFont(Font.font("Verdana", 20));
        livesLabel.setTextFill(Color.WHITE);

        highScoreLabel = new Label("Skor Tertinggi: " + scoreManager.getHighScore());
        highScoreLabel.setFont(Font.font("Verdana", 20));
        highScoreLabel.setTextFill(Color.WHITE);

        difficultyBox = new ComboBox<>();
        difficultyBox.getItems().addAll("Mudah", "Sedang", "Sulit");
        difficultyBox.setValue("Mudah");
        difficultyBox.setStyle(
            "-fx-background-color: linear-gradient(to bottom, #4eb5ff, #2980b9);" +
            "-fx-text-fill: white;" +
            "-fx-font-size: 14px;" +
            "-fx-background-radius: 20px;"
        );

        startButton = new Button("Mulai Game");
        styleButton(startButton);
        startButton.setOnAction(e -> startGame());

        VBox stats = new VBox(10, timerLabel, scoreLabel, livesLabel, highScoreLabel, difficultyBox, startButton);
        stats.setStyle("-fx-alignment: center;");

        Pane gamePane = new Pane();
        gamePane.setPrefHeight(300);
        gamePane.setStyle("-fx-background-color: black;");

        VBox layout = new VBox(20, wordLabel, inputField, stats, gamePane);
        layout.setStyle("-fx-background-color: black; -fx-padding: 20; -fx-alignment: center;");
        VBox.setVgrow(gamePane, Priority.ALWAYS);

        gamePane.widthProperty().addListener((observable, oldValue, newValue) -> animateSnow(gamePane));

        return layout;
    }

    private void animateSnow(Pane gamePane) {
        Timeline snowTimeline = new Timeline(new KeyFrame(Duration.millis(100), e -> {
            Circle snowflake = new Circle(2, Color.WHITE);
            snowflake.setCenterX(gameConfig.RANDOM.nextInt((int) gamePane.getWidth()));
            snowflake.setCenterY(0);

            gamePane.getChildren().add(snowflake);

            TranslateTransition fallAnimation = new TranslateTransition(Duration.seconds(5), snowflake);
            fallAnimation.setToY(gamePane.getHeight());
            fallAnimation.setOnFinished(event -> gamePane.getChildren().remove(snowflake));
            fallAnimation.play();
        }));
        snowTimeline.setCycleCount(Timeline.INDEFINITE);
        snowTimeline.play();
    }

    private void startGame() {
        if (isGameRunning) {
            return;
        }

        switch (difficultyBox.getValue()) {
            case "Mudah":
                currentDifficulty = new EasyDifficulty();
                break;
            case "Sedang":
                currentDifficulty = new MediumDifficulty();
                break;
            case "Sulit":
                currentDifficulty = new HardDifficulty();
                break;
        }

        difficultyBox.setDisable(true);
        startButton.setDisable(true);

        isGameRunning = true;
        scoreManager.resetScore();
        score = 0;
        lives = currentDifficulty.getInitialLives();
        timeLeft = gameConfig.getGameDuration();

        timerLabel.setText("Waktu: " + timeLeft + " detik");
        scoreLabel.setText("Skor: 0");
        livesLabel.setText("Nyawa: " + lives);

        inputField.setDisable(false);
        inputField.clear();
        inputField.requestFocus();

        if (gameTimeline != null) {
            gameTimeline.stop();
        }
        gameTimeline = new Timeline(new KeyFrame(Duration.seconds(1), e -> updateTimer()));
        gameTimeline.setCycleCount(gameConfig.getGameDuration());
        gameTimeline.setOnFinished(e -> endGame());
        gameTimeline.play();

        generateWord();
    }

    private void generateWord() {
        currentWord = gameConfig.getWordList().get(gameConfig.RANDOM.nextInt(gameConfig.getWordList().size()));

        if (gameConfig.RANDOM.nextInt(10) < 2) {
            currentWord = currentWord.toUpperCase();
        }

        wordLabel.setText(currentWord);

        if (wordAnimation != null) {
            wordAnimation.stop();
        }

        wordAnimation = new TranslateTransition(Duration.seconds(currentDifficulty.getWordSpeed()), wordLabel);
        wordAnimation.setFromX(800);
        wordAnimation.setToX(-wordLabel.getWidth() - 450);
        wordAnimation.setOnFinished(e -> {
            lives--;
            livesLabel.setText("Nyawa: " + lives);
            if (lives == 0) {
                endGame();
            } else {
                generateWord();
            }
        });
        wordAnimation.play();
    }

    private void checkInput() {
        String userInput = inputField.getText().trim();
        if (userInput.equalsIgnoreCase(currentWord)) {
            // Bonus points for uppercase words
            score += currentWord.equals(currentWord.toUpperCase()) ? gameConfig.getBonusPoints() : 1;
            scoreLabel.setText("Skor: " + score);
            generateWord();
        }
        inputField.clear();
    }

    private void updateTimer() {
        timeLeft--;
        timerLabel.setText("Waktu: " + timeLeft + " detik");
        if (timeLeft <= 0) {
            endGame();
        }
    }

    private void endGame() {
        isGameRunning = false;
        
        if (gameTimeline != null) {
            gameTimeline.stop();
        }
        if (wordAnimation != null) {
            wordAnimation.stop();
        }
        
        inputField.setDisable(true);

        difficultyBox.setDisable(false);
        startButton.setDisable(false);

        if (score > scoreManager.getHighScore()) {
            scoreManager.incrementScore(score);
            highScoreLabel.setText("Skor Tertinggi: " + scoreManager.getHighScore());
        }

        showGameOverScreen((Stage) wordLabel.getScene().getWindow());
    }

    private void showGameOverScreen(Stage primaryStage) {
        VBox gameOverScreen = new VBox(20);
        gameOverScreen.setStyle("-fx-background-color: rgba(0, 0, 0, 0.8); -fx-padding: 20; -fx-alignment: center;");

        Label gameOverLabel = new Label("Permainan Berakhir!");
        gameOverLabel.setFont(Font.font("Verdana", 30));
        gameOverLabel.setTextFill(Color.WHITE);

        Label finalScoreLabel = new Label("Skor Akhir: " + score);
        finalScoreLabel.setFont(Font.font("Verdana", 20));
        finalScoreLabel.setTextFill(Color.WHITE);

        Button restartButton = new Button("Mulai Lagi");
        styleButton(restartButton);
        restartButton.setMaxWidth(Double.MAX_VALUE);
        restartButton.setOnAction(e -> {
            primaryStage.getScene().setRoot(createMainLayout(primaryStage));
            startGame();
        });

        Button quitButton = new Button("Keluar");
        styleButton(quitButton);
        quitButton.setMaxWidth(Double.MAX_VALUE);
        quitButton.setOnAction(e -> primaryStage.close());

        gameOverScreen.getChildren().addAll(gameOverLabel, finalScoreLabel, restartButton, quitButton);

        Scene scene = primaryStage.getScene();
        StackPane root = new StackPane(scene.getRoot(), gameOverScreen);
        scene.setRoot(root);
    }
    
    private void styleButton(Button button) {
        button.setStyle(
            "-fx-background-color: linear-gradient(to bottom, #4eb5ff, #2980b9);" + // Gradient background
            "-fx-text-fill: white;" + // White text
            "-fx-font-size: 16px;" + // Larger font
            "-fx-font-weight: bold;" + // Bold text
            "-fx-background-radius: 20px;" + // Rounded corners
            "-fx-padding: 10px 20px;" + // Padding
            "-fx-cursor: hand;" // Change cursor to hand on hover
        );

        button.setOnMouseEntered(e -> button.setStyle(
            "-fx-background-color: linear-gradient(to bottom, #5ec6ff, #3498db);" + // Lighter gradient on hover
            "-fx-text-fill: white;" +
            "-fx-font-size: 16px;" +
            "-fx-font-weight: bold;" +
            "-fx-background-radius: 20px;" +
            "-fx-padding: 10px 20px;" +
            "-fx-cursor: hand;"
        ));

        button.setOnMouseExited(e -> button.setStyle(
            "-fx-background-color: linear-gradient(to bottom, #4eb5ff, #2980b9);" +
            "-fx-text-fill: white;" +
            "-fx-font-size: 16px;" +
            "-fx-font-weight: bold;" +
            "-fx-background-radius: 20px;" +
            "-fx-padding: 10px 20px;" +
            "-fx-cursor: hand;"
        ));
    }
}
