import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
import javafx.scene.input.KeyCode;
import javafx.scene.layout.Pane;
import javafx.stage.Stage;
import javafx.util.Duration;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

public class GameEngine {
    private final Timeline spawnTimeline;
    private final Timeline fallingTimeline;
    private final List<FallingText> fallingTexts;
    private final Player player;
    private final RainTyping rainTyping;
    private final Random random;

    private MainMenu mainMenu;
    private boolean isPaused;
    private static final String[] GAME_WORDS = {"java", "code", "typing", "game"};

    public GameEngine(Player player, RainTyping rainTyping) {
        this.player = player;
        this.rainTyping = rainTyping;
        this.fallingTexts = new ArrayList<>();
        this.random = new Random();
        this.isPaused = false;

        this.spawnTimeline = new Timeline(new KeyFrame(Duration.seconds(1), e -> spawnText()));
        this.fallingTimeline = new Timeline(new KeyFrame(Duration.millis(50), e -> updateFallingTexts()));

        spawnTimeline.setCycleCount(Timeline.INDEFINITE);
        fallingTimeline.setCycleCount(Timeline.INDEFINITE);
    }

    public void setMainMenu(MainMenu mainMenu) {
        this.mainMenu = mainMenu;
    }

    public void startGame(Pane root, Stage primaryStage) {
        spawnTimeline.play();
        fallingTimeline.play();
    }

    private void spawnText() {
        if (isPaused) return;

        String randomWord = GAME_WORDS[random.nextInt(GAME_WORDS.length)];
        double x = random.nextDouble() * 700; 

        FallingText text = FallingText.create(randomWord, x, 0);
        fallingTexts.add(text);
        text.render(rainTyping.getGameRoot()); 
    System.out.println("Spawned text: " + randomWord);
    }

    private void updateFallingTexts() {
        if (isPaused) return;

        List<FallingText> toRemove = new ArrayList<>();
        for (FallingText text : fallingTexts) {
            text.updatePosition(0.05);

            if (text.isOutOfBounds(600)) { 
                toRemove.add(text);
                player.decreaseLives();
                rainTyping.updateStatus();

                if (!player.isAlive()) {
                    stopGame();
                    showGameOverMenu();
                    break; 
                }
            }
        }
        fallingTexts.removeAll(toRemove);
    }

    private void stopGame() {
        spawnTimeline.stop();
        fallingTimeline.stop();
    }

    public void handleKeyPress(KeyCode code) {
        if (code == KeyCode.ESCAPE) {
            togglePause();
        }
    }

    private void togglePause() {
        isPaused = !isPaused;

        if (isPaused) {
            spawnTimeline.stop();
            fallingTimeline.stop();
            if (mainMenu != null) {
                mainMenu.showPauseMenu();
            }
        } else {
            if (player.isAlive()) {
                spawnTimeline.play();
                fallingTimeline.play();
            }
        }
    }
    private void showGameOverMenu() {
        if (mainMenu != null) {
            mainMenu.showGameOverMenu(rainTyping.getPrimaryStage(), player.getScore());
        }
    }

    public void processInput(String input) {
        if (isPaused) return;

        FallingText closestText = null;
        double maxY = Double.MIN_VALUE;

        for (FallingText text : fallingTexts) {
            double textY = text.getLabel().getLayoutY();
            if (textY > maxY) {
                maxY = textY;
                closestText = text;
            }
        }

        if (closestText != null && !closestText.isEmpty()) {
            String currentText = closestText.getText();
            if (currentText.startsWith(input)) {
                closestText.removeFirstCharacter();
                
                 player.increaseScore();
            
                rainTyping.updateStatus();

                if (closestText.isEmpty()) {
                    fallingTexts.remove(closestText);
                    closestText.getLabel().setVisible(false);
                }

                
                rainTyping.updateStatus();
            }
        }
    }

    public List<FallingText> getFallingTexts() {
        return Collections.unmodifiableList(new ArrayList<>(fallingTexts));
    }
}