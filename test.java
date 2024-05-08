import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

class test{
    public static void main(String[] args) throws IOException {
        URL url = new URL("http://localhost:3000/documentation");
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");
        int status = con.getResponseCode();
        con.disconnect();
        System.out.println(status);
    }
}