import java.util.List;
import javafx.application.Application;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;
import javafx.scene.text.Font;
import javafx.stage.Stage;

public class MainMenu extends Application {
    private RainTyping game;
    private Button startButton;
    private Button exitButton;
    private Stage primaryStage;
    private int highScore = 0;

    @Override
    public void start(Stage primaryStage) {
        this.primaryStage = primaryStage;
        initMainMenu(primaryStage);
    }

    private void initMainMenu(Stage primaryStage) {
        VBox root = createMainMenu(primaryStage);
        Scene scene = new Scene(root, 800, 600);

        try {
            scene.getStylesheets().add(getClass().getResource("menuStyle.css").toExternalForm());
        } catch (Exception e) {
            System.out.println("CSS file not found, using default styling");
        }

        primaryStage.setScene(scene);
        primaryStage.setTitle("Rain Typing Game - Main Menu");
        primaryStage.show();
    }

    private VBox createMainMenu(Stage primaryStage) {
        VBox menuBox = new VBox(20);
        menuBox.setId("menu-box");

        Label titleLabel = new Label("Rain Typing");
        titleLabel.setFont(Font.font("Arial", 40));
        titleLabel.setStyle("-fx-text-fill: white; -fx-font-weight: bold;");
        titleLabel.setAlignment(Pos.CENTER); // Menengahkan label
        menuBox.getChildren().add(titleLabel);

        Label highScoreLabel = new Label("Skor Tertinggi: " + highScore);
        highScoreLabel.setId("high-score-label");

        initializeButtons(primaryStage);

        menuBox.getChildren().addAll(highScoreLabel, startButton, exitButton);
        return menuBox;
    }

    private void initializeButtons(Stage primaryStage) {
        startButton = new Button("Mulai");
        startButton.setId("start-button");
        startButton.setOnAction(event -> startGame(primaryStage));

        exitButton = new Button("Keluar");
        exitButton.setId("exit-button");
        exitButton.setOnAction(event -> exitGame());
    }
    
    private void startGame(Stage primaryStage) {
        if (game != null) {
            game.startGame(primaryStage);
        }
    }
    
    private void exitGame() {
        System.exit(0);
    }

    public void setGame(RainTyping game) {
        this.game = game;
    }
    
    private boolean isPaused = false;
    public void showPauseMenu() {
        VBox pauseMenuBox = new VBox(20);
        pauseMenuBox.setId("pause-menu-box");
        isPaused = true;
        Button resumeGameButton = new Button("Lanjutkan Game");
        resumeGameButton.setId("resume-game-button");
        resumeGameButton.setOnAction(event -> {
            if (isPaused) {
                startGame(primaryStage);
            }
        });

        Button restartGameButton = new Button("Ulang Game");
        restartGameButton.setId("restart-game-button");
        restartGameButton.setOnMouseClicked(event -> restartGame());

        Button exitToMainMenuButton = new Button("Keluar ke Main Menu");
        exitToMainMenuButton.setId("exit-to-main-menu-button");
        exitToMainMenuButton.setOnMouseClicked(event -> exitToMainMenu());
        
   

        pauseMenuBox.getChildren().addAll(resumeGameButton, restartGameButton, exitToMainMenuButton);

        Scene scene = new Scene(pauseMenuBox, 800, 600);
        try {
            scene.getStylesheets().add(getClass().getResource("pauseStyle.css").toExternalForm());
        } catch (Exception e) {
            System.out.println("CSS file not found, using default styling");
        }
        primaryStage.setScene(scene);
        primaryStage.show();
    }
    public void showGameOverMenu(Stage primaryStage, int score) {
        if (score > highScore) {
            highScore = score;
        }

        VBox gameOverBox = new VBox(20);
        gameOverBox.setId("game-over-box");
        gameOverBox.setStyle("-fx-background-color: #212121; -fx-padding: 20px;");

        Label scoreLabel = new Label("Skor Akhir: " + score);
        Label highScoreLabel = new Label("Skor Tertinggi: " + highScore);
        
        scoreLabel.setStyle("-fx-text-fill: #ffffff; -fx-font-size: 20px;");
        highScoreLabel.setStyle("-fx-text-fill: #ffffff; -fx-font-size: 20px;");

        Button playAgainButton = new Button("Main Lagi");
        playAgainButton.setId("play-again-button");
        playAgainButton.setStyle("-fx-background-color: #4CAF50;; -fx-text-fill: white; -fx-padding: 10px 20px;");
        playAgainButton.setOnMouseClicked(event -> {
            if (game != null) {
                game.startGame(primaryStage); 
            }
        });

        Button exitButton = new Button("Keluar");
        exitButton.setId("exit-button");
        exitButton.setStyle("-fx-background-color: #4CAF50; -fx-text-fill: white; -fx-padding: 10px 20px;");
        exitButton.setOnMouseClicked(event -> exitGame());

        gameOverBox.getChildren().addAll(scoreLabel, highScoreLabel, playAgainButton, exitButton);

        Scene scene = new Scene(gameOverBox, 800, 600);
        try {
            scene.getStylesheets().add(getClass().getResource("restartStyle.css").toExternalForm());
        } catch (Exception e) {
            System.out.println("CSS file not found, using default styling");
        }
        primaryStage.setScene(scene);
        primaryStage.setTitle("Game Over - Main Menu");
        primaryStage.show();
    }
    
    private void restartGame() {
        if (game != null) {
            game.startGame(primaryStage);
        }
    }

    private void exitToMainMenu() {
        initMainMenu(primaryStage);
    }
}
