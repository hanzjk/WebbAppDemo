
import ballerina/http;
import ballerina/os;


service /hello on new http:Listener(8090) {
    resource function get greeting() returns string|error {
        string serviceURL = os:getEnv("SVC_URL");
        return "Hello, World!+ serviceURL: " + serviceURL + "\n";
    }
}
