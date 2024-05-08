import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;


class test{
    public static void main(String[] args)  {
        URL url;
        try {
            url = new URL("http://localhost:3000/checkRoomAvailability");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty
            int status = con.getResponseCode();
            con.disconnect();
            System.out.println(status);
        } catch (MalformedURLException e) {e.printStackTrace();} catch (ProtocolException e) {e.printStackTrace();} catch (IOException e) {e.printStackTrace();} 
    }
}