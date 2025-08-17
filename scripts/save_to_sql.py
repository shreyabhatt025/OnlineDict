{
  "nbformat": 4,
  "nbformat_minor": 0,
  "metadata": {
    "colab": {
      "provenance": [],
      "authorship_tag": "ABX9TyMYvMMoFdAiIwShIyouFnWK",
      "include_colab_link": true
    },
    "kernelspec": {
      "name": "python3",
      "display_name": "Python 3"
    },
    "language_info": {
      "name": "python"
    }
  },
  "cells": [
    {
      "cell_type": "markdown",
      "metadata": {
        "id": "view-in-github",
        "colab_type": "text"
      },
      "source": [
        "<a href=\"https://colab.research.google.com/github/shreyabhatt025/OnlineDict/blob/main/scripts/save_to_sql.py\" target=\"_parent\"><img src=\"https://colab.research.google.com/assets/colab-badge.svg\" alt=\"Open In Colab\"/></a>"
      ]
    },
    {
      "cell_type": "code",
      "execution_count": 3,
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "fpxLY-i6SwkP",
        "outputId": "0db29bf6-1595-40ca-89ab-8fe15f8ba0a8"
      },
      "outputs": [
        {
          "output_type": "stream",
          "name": "stdout",
          "text": [
            "Requirement already satisfied: requests in /usr/local/lib/python3.11/dist-packages (2.32.3)\n",
            "Requirement already satisfied: pandas in /usr/local/lib/python3.11/dist-packages (2.2.2)\n",
            "Requirement already satisfied: charset-normalizer<4,>=2 in /usr/local/lib/python3.11/dist-packages (from requests) (3.4.3)\n",
            "Requirement already satisfied: idna<4,>=2.5 in /usr/local/lib/python3.11/dist-packages (from requests) (3.10)\n",
            "Requirement already satisfied: urllib3<3,>=1.21.1 in /usr/local/lib/python3.11/dist-packages (from requests) (2.5.0)\n",
            "Requirement already satisfied: certifi>=2017.4.17 in /usr/local/lib/python3.11/dist-packages (from requests) (2025.8.3)\n",
            "Requirement already satisfied: numpy>=1.23.2 in /usr/local/lib/python3.11/dist-packages (from pandas) (2.0.2)\n",
            "Requirement already satisfied: python-dateutil>=2.8.2 in /usr/local/lib/python3.11/dist-packages (from pandas) (2.9.0.post0)\n",
            "Requirement already satisfied: pytz>=2020.1 in /usr/local/lib/python3.11/dist-packages (from pandas) (2025.2)\n",
            "Requirement already satisfied: tzdata>=2022.7 in /usr/local/lib/python3.11/dist-packages (from pandas) (2025.2)\n",
            "Requirement already satisfied: six>=1.5 in /usr/local/lib/python3.11/dist-packages (from python-dateutil>=2.8.2->pandas) (1.17.0)\n"
          ]
        }
      ],
      "source": [
        "pip install requests pandas"
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "import requests\n",
        "\n",
        "# api\n",
        "\n",
        "url= \"https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd\"\n",
        "response = requests.get(url)\n",
        "data=response.json()\n",
        "print(data)\n"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "ITjqtxnVTpvY",
        "outputId": "c32136ee-b871-42ce-e97e-9f0059a76c0c"
      },
      "execution_count": 4,
      "outputs": [
        {
          "output_type": "stream",
          "name": "stdout",
          "text": [
            "{'bitcoin': {'usd': 118467}}\n"
          ]
        }
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "import requests\n",
        "import pandas as pd\n",
        "from datetime import datetime\n",
        "\n",
        "def fetch_crypto_data(coin: str, days: int = 30):\n",
        "    \"\"\"\n",
        "    Fetch historical price data for a given coin from CoinGecko.\n",
        "\n",
        "    Parameters:\n",
        "        coin (str): The coin id (e.g., 'bitcoin', 'ethereum').\n",
        "        days (int): Number of past days of data.\n",
        "\n",
        "    Returns:\n",
        "        pd.DataFrame: DataFrame with date and price.\n",
        "    \"\"\"\n",
        "    url = f\"https://api.coingecko.com/api/v3/coins/{coin}/market_chart\"\n",
        "    params = {\n",
        "        \"vs_currency\": \"usd\",\n",
        "        \"days\": days,\n",
        "        \"interval\": \"daily\"\n",
        "    }\n",
        "\n",
        "    response = requests.get(url, params=params)\n",
        "    data = response.json()\n",
        "\n",
        "    # Extract price data\n",
        "    prices = data['prices']  # list of [timestamp, price]\n",
        "    df = pd.DataFrame(prices, columns=[\"timestamp\", \"price\"])\n",
        "\n",
        "    # Convert timestamp to readable date\n",
        "    df[\"date\"] = pd.to_datetime(df[\"timestamp\"], unit=\"ms\")\n",
        "    df = df[[\"date\", \"price\"]]\n",
        "    df[\"coin\"] = coin  # Add a column for the coin name\n",
        "\n",
        "    return df\n",
        "\n",
        "\n",
        "def save_to_csv(df: pd.DataFrame, filename: str):\n",
        "    \"\"\"\n",
        "    Save the DataFrame to a CSV file.\n",
        "    \"\"\"\n",
        "    df.to_csv(filename, index=False)\n",
        "    print(f\"✅ Data saved to {filename}\")\n",
        "\n",
        "\n",
        "if __name__ == \"__main__\":\n",
        "    # Fetch Bitcoin & Ethereum (past 90 days)\n",
        "    btc_data = fetch_crypto_data(\"bitcoin\", days=90)\n",
        "    eth_data = fetch_crypto_data(\"ethereum\", days=90)\n",
        "\n",
        "    # Combine both datasets\n",
        "    combined_df = pd.concat([btc_data, eth_data])\n",
        "\n",
        "    # Save to CSV\n",
        "    today = datetime.today().strftime(\"%Y-%m-%d\")\n",
        "    filename = f\"crypto_data_{today}.csv\"\n",
        "    save_to_csv(combined_df, filename)\n",
        "\n",
        "    print(combined_df.head())\n"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/"
        },
        "id": "-uDw7v1bX4-t",
        "outputId": "7f6a780a-938f-45d0-fa2a-cecc0bc5757e"
      },
      "execution_count": 5,
      "outputs": [
        {
          "output_type": "stream",
          "name": "stdout",
          "text": [
            "✅ Data saved to crypto_data_2025-08-17.csv\n",
            "        date          price     coin\n",
            "0 2025-05-20  105629.415804  bitcoin\n",
            "1 2025-05-21  106786.719958  bitcoin\n",
            "2 2025-05-22  109665.863716  bitcoin\n",
            "3 2025-05-23  111560.356938  bitcoin\n",
            "4 2025-05-24  107216.668569  bitcoin\n"
          ]
        }
      ]
    }
  ]
}