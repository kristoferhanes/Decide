# Decide

## Description

This is a simple decision making tool. It is a CLI application that helps you make decisions. It uses Dempster-Shafer theory to combine the ratings of each option's criteria to give a final rating for each option. The option with the highest rating is the best overall option.

### Criteria

The criteria are the factors you want to consider when making a decision. For example, if you are deciding between two cars, the criteria might be cost, performance, fuel efficiency, and safety. Each criterion should have a weight that represents its importance in the decision. The weight should be a number between 1 and 5, where 1 is not important and 5 is very important.

### Options

The options are the choices you are considering. For example, if you are deciding between two cars, the options might be a Honda Civic and a Toyota Corolla. Each option should have a rating for each criterion that represents how well it meets that criterion. The rating should be a number between 1 and 5, where 1 is poor and 5 is excellent.

### Dempster-Shafer theory

Dempster-Shafer theory is a mathematical theory of evidence that can be used to combine ratings from multiple criteria to give a final rating for each option. The theory is based on the idea of belief functions, which represent the degree of belief in a proposition. The theory provides a way to combine these belief functions to give a final belief function for each option.

## Running the application

To run the application, first install the dependencies using the following command:

```bash
npm i
```

Then you can run the application using the following command:

```bash
npm start
```

## Using the application

The application will ask you to enter the decision criteria you want to consider for each option. You can enter as many criteria as you like. For each criteria, you will be asked provide a weight for its importance. The weight should be a number between 1 and 5, where 1 is not important and 5 is very important.

After entering the criteria, you will be asked to enter the options you want to consider. You can enter as many options as you like. For each option, you will be asked to rate how well it meets each criteria. The rating should be a number between 1 and 5, where 1 is poor and 5 is excellent.

Once you have entered all the criteria and options, the application will calculate the final rating for each option and display the weights for each option. The option with the highest weight is the best overall option.

## Example

Here is an example of how you might use the application:

```
Enter a criterion (or press enter to finish): cost
Enter the weight for cost (1 - 5): 5
Enter a criterion (or press enter to finish): performance
Enter the weight for performance (1 - 5): 3
Enter a criterion (or press enter to finish):

Enter an option (or press enter to finish): option 1
Enter the rating for cost for option 1 (1 - 5): 3
Enter the rating for performance for option 1 (1 - 5): 4

Enter an option (or press enter to finish): option 2
Enter the rating for cost for option 2 (1 - 5): 4
Enter the rating for performance for option 2 (1 - 5): 3

Enter an option (or press enter to finish):

Decision:
option 1: 2.63
option 2: 3.37
```

In this example, the criteria are cost and performance. Cost has a weight of 5 and performance has a weight of 3. There are two options, option 1 and option 2. Option 1 has a cost rating of 3 and a performance rating of 4. Option 2 has a cost rating of 4 and a performance rating of 3. The final ratings are 2.63 for option 1 and 3.37 for option 2, so option 2 is the best overall option.

## References

- [Dempster-Shafer theory](https://en.wikipedia.org/wiki/Dempster–Shafer_theory)
