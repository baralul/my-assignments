import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.stage.Stage;

public class RainTyping extends Application {
    private static final int INITIAL_LIVES = 5;
    private static final int WINDOW_WIDTH = 800;
    private static final int WINDOW_HEIGHT = 600;
    private static final String GAME_TITLE = "Rain Typing";

    private final MainMenu mainMenu;

    private GameEngine gameEngine;
    private Player player;
    private Stage primaryStage;
    private Pane gameRoot;
    private Label livesLabel;
    private Label scoreLabel;

    public RainTyping() {
        this.mainMenu = new MainMenu();
        this.mainMenu.setGame(this);
    }

    @Override
    public void start(Stage primaryStage) {
        this.primaryStage = primaryStage;
        mainMenu.start(primaryStage);
    }
    private boolean isPaused = false; 

    public void startGame(Stage stage) {
        if (isPaused) {
            isPaused = false; 
            primaryStage.setScene(gameRoot.getScene()); 
            primaryStage.show();
            return; 
        }

        initializePlayer();
        prepareGameRoot();
        Scene scene = createGameScene();
        initializeGameEngine();
        setupEventHandlers(scene);
        
        

        primaryStage.setScene(scene);
        primaryStage.setTitle(GAME_TITLE);
        primaryStage.show();

        updateStatus();
    }

    private void initializePlayer() {
        player = new Player(INITIAL_LIVES);
    }

    private void prepareGameRoot() {
        gameRoot = new Pane();
        gameRoot.setStyle("-fx-background-color: black;");
        
        HBox statusBox = createStatusBox();
        gameRoot.getChildren().add(statusBox);
    }

    private Scene createGameScene() {
        return new Scene(gameRoot, WINDOW_WIDTH, WINDOW_HEIGHT, Color.BLACK);
    }

    private void initializeGameEngine() {
        gameEngine = new GameEngine(player, this);
        gameEngine.setMainMenu(mainMenu);
        gameEngine.startGame(gameRoot, primaryStage);
    }

    private void setupEventHandlers(Scene scene) {
        scene.setOnKeyTyped(event -> {
            String input = event.getCharacter().toLowerCase();
            gameEngine.processInput(input);
        });

        scene.setOnKeyPressed(event -> {
            gameEngine.handleKeyPress(event.getCode());
        });
    }
    public Pane getGameRoot() {
        return gameRoot;
    }
    
    public void pauseGame() {
    isPaused = true;
}

    private HBox createStatusBox() {

        initializeStatusLabels();

        HBox statusBox = new HBox(20);
        statusBox.setLayoutX(10);
         statusBox.setLayoutY(WINDOW_HEIGHT - 50);
        statusBox.getChildren().addAll(livesLabel, scoreLabel);

        return statusBox;
    }

    private void initializeStatusLabels() {
       
        livesLabel = createLabel("Nyawa: " + INITIAL_LIVES);
        
        scoreLabel = createLabel("Skor: 0");
    }
    
    public Stage getPrimaryStage() {
    return this.primaryStage;
}

    private Label createLabel(String text) {
        Label label = new Label(text);
        label.setTextFill(Color.WHITE);
        label.setFont(Font.font(20));
        return label;
    }

    public void updateStatus() {
        livesLabel.setText("Nyawa: " + player.getLives());
        scoreLabel.setText("Skor: " + player.getScore());
    }

    public static void main(String[] args) {
        launch(args);
    }
}