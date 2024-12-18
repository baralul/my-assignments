public class Player {
    // Variabel private
    private int lives;  
    private int score;  
    private static final int INITIAL_LIVES = 5;
    private static final int MAX_LIVES = 5;

    public Player() {
        this(INITIAL_LIVES);
    }

    public Player(int initialLives) {
        setLives(initialLives);
        this.score = 0;
    }

    public int getLives() {
        return lives;
    }

    private void setLives(int lives) {
        if (lives < 0) {
            throw new IllegalArgumentException("Nyawa tidak boleh kurang dari 0");
        }
        this.lives = Math.min(lives, MAX_LIVES);
    }

    public int getScore() {
        return score;
    }

    public void decreaseLives() {
        if (lives > 0) {
            lives--;
        }
    }

    public void increaseScore() {
        if (score >= 0) {
            score++;
        }
    }

    public boolean isAlive() {
        return lives > 0;
    }

    public void reset() {
        setLives(INITIAL_LIVES);
        this.score = 0;
    }
}