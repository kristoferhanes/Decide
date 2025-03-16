# Decide

## Description

This is a simple decision making tool. It is a CLI application that helps you make decisions. It uses Dempster-Shafer theory to combine the ratings of each option's criteria to give a final rating for each option. The option with the highest rating is the best overall option.

### Criteria

The criteria are the factors you want to consider when making a decision. For example, if you are deciding between two cars, the criteria might be cost, performance, fuel efficiency, and safety. Each criterion should have a weight that represents its importance in the decision.

### Options

The options are the choices you are considering. For example, if you are deciding between two cars, the options might be a Honda Civic and a Toyota Corolla. Each option should have a rating for each criterion that represents how well it meets that criterion.

### Dempster-Shafer theory

Dempster-Shafer theory is a mathematical theory of evidence that can be used to combine ratings from multiple criteria to give a final rating for each option. The theory is based on the idea of belief functions, which represent the degree of belief in a proposition. The theory provides a way to combine these belief functions to give a final belief function for each option.

## Running the application

To run the application, first install the dependencies using the following command:

```bash
npm i
```

Then you can run the application using the following command:

```bash
npm start -- -c <PATH_TO_CONFIG_FILE>
```

## Configuration File Format

This application uses a YAML configuration file to specify the criteria and options for the decision. The configuration file should have a `criteria` section that lists the criteria and their weights, and an `options` section that lists the options and their ratings for each criterion. The weights and ratings should be numbers between 0 and 1, not inclusive, that represent the importance of each criterion.

### Example

```yaml
criteria:
  - name: 'Cost'
    weight: 0.5
  - name: 'Quality'
    weight: 0.3
  - name: 'Durability'
    weight: 0.2

options:
  - name: 'Option A'
    ratings:
      Cost: 0.8
      Quality: 0.7
      Durability: 0.9
  - name: 'Option B'
    ratings:
      Cost: 0.6
      Quality: 0.8
      Durability: 0.7
  - name: 'Option C'
    ratings:
      Cost: 0.7
      Quality: 0.9
      Durability: 0.8
```

## References

- [Dempster-Shafer theory](https://en.wikipedia.org/wiki/Dempster–Shafer_theory)
