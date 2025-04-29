package in.scalive.votingApp.exception;

public class DuplicateResourceException extends RuntimeException{

	public DuplicateResourceException(String message) {
		super(message);
	}
}