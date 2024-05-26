# Sales Page Scraping Script Documentation

This script is designed to obtain product information from sales sites, such as eBay, using scraping techniques.

## Facility

1. Clone the repository to your local machine.

2. Install the necessary dependencies using npm:

   ```bash
   npm install

2. Use

    The script provides two endpoints to interact with it:

  1.POST/scrapping
     
  - Description: Get detailed information about an eBay product using its URL.
  - HTTP Method: POST
  - Required data: A JSON object with the URL of the product on eBay

  ```bash
    {
      "url": "https://www.ebay.com/itm/Product-Example/1234567890"
    }
  ```

Successful answer:

  - Code 200 OK with a JSON object containing product information.
    
Error response:
  - Code 400 Bad Request if a valid URL is not provided, or Code 500 Internal Server Error if an error occurs during the scraping process.

  5. GET /logic
     
Description: 
  - Executes the logic defined in the script to process the products obtained through scraping and returns the products with alerts.  
  - Successful response: Code 200 OK with an array of JSON objects that contain the products with alerts.
  - Error response: Code 500 Internal Server Error if an error occurs while processing products with alerts.

  6. Execution:

```bash
node index.js
