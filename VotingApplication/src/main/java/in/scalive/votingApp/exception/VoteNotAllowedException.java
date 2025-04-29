package in.scalive.votingApp.exception;

public class VoteNotAllowedException extends RuntimeException{

	public VoteNotAllowedException(String message) {
		super(message);
	}
}