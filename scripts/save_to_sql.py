{
  "nbformat": 4,
  "nbformat_minor": 0,
  "metadata": {
    "colab": {
      "provenance": [],
      "authorship_tag": "ABX9TyMhdy14p70Ie5FLFh8FwAW9",
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
      "execution_count": null,
      "metadata": {
        "id": "2DKAHTKjiQqO"
      },
      "outputs": [],
      "source": [
        "import sqlite3\n",
        "import pandas as pd\n",
        "\n",
        "def save_to_sqlite(df: pd.DataFrame, db_name=\"crypto_data.db\"):\n",
        "    \"\"\"\n",
        "    Save DataFrame into SQLite database.\n",
        "\n",
        "    Parameters:\n",
        "        df (pd.DataFrame): DataFrame with crypto data.\n",
        "        db_name (str): SQLite database file name.\n",
        "    \"\"\"\n",
        "    # Connect to SQLite (creates file if not exists)\n",
        "    conn = sqlite3.connect(db_name)\n",
        "\n",
        "    # Save to table 'crypto_prices'\n",
        "    df.to_sql(\"crypto_prices\", conn, if_exists=\"append\", index=False)\n",
        "\n",
        "    conn.close()\n",
        "    print(f\"✅ Data inserted into {db_name} (table: crypto_prices)\")\n",
        "\n",
        "\n",
        "if __name__ == \"__main__\":\n",
        "    # Example: Load a CSV and push to SQL\n",
        "    df = pd.read_csv(\"../data/crypto_data_2025-08-17.csv\")\n",
        "    save_to_sqlite(df)\n"
      ]
    }
  ]
}