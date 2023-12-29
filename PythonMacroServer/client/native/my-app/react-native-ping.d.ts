declare module 'react-native-ping' {
    interface PingResponse {
      alive: boolean;
      time: number;
      numeric_host: string;
      host: string;
      output: string;
    }
  
    interface PingOptions {
      timeout?: number;
      packetSize?: number;
    }
  
    class Ping {
      static start(host: string, options?: PingOptions): Promise<PingResponse>;
    }
  
    export default Ping;
  }
  