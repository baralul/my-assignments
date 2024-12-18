import javafx.scene.layout.Pane;

public interface GameElement {
    void updatePosition(double deltaTime);
    void render(Pane root);
    
    default boolean isValidPosition(double x, double y) {
        return x >= 0 && y >= 0;
    }
}