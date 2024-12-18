    import javafx.scene.control.Label;
    import javafx.scene.layout.Pane;
    import javafx.scene.paint.Color;
    import javafx.scene.text.Font;

    public class FallingText implements GameElement {
        private final Label label;
        private double x;
        private double y;
        private static final double FALL_SPEED = 2.0;
        private static final Font DEFAULT_FONT = new Font("Arial", 20);

        private FallingText(String text, double x, double y) {
            this.label = new Label(text);
            this.label.setFont(DEFAULT_FONT);
            this.label.setTextFill(Color.WHITE);
            this.x = x;
            this.y = y;
            updatePosition(0);
        }

        public String getText() {
            return label.getText();
        }

        Label getLabel() {
            return label;
        }

        @Override
        public void updatePosition(double deltaTime) {
            y += FALL_SPEED;
            label.setLayoutX(x);
            label.setLayoutY(y);
        }

        @Override
        public void render(Pane root) {
            if (!root.getChildren().contains(label)) {
                root.getChildren().add(label);
            }
        }

        public boolean isOutOfBounds(double height) {
            return y > height;
        }

        public void removeFirstCharacter() {
            String currentText = label.getText();
            if (currentText.length() > 1) {
                label.setText(currentText.substring(1));
            } else {
                label.setText("");
            }
        }

        public boolean isEmpty() {
            return label.getText().isEmpty();
        }

        public static FallingText create(String text, double x, double y) {
            if (text == null || text.isEmpty()) {
                throw new IllegalArgumentException("Text tidak boleh kosong");
            }
            return new FallingText(text, x, y);
        }
    }