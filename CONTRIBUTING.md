# Contributing to Hello FHEVM Tutorial

Thank you for your interest in contributing to the Hello FHEVM tutorial! This project aims to create the most beginner-friendly introduction to building confidential dApps with FHEVM.

## 🤝 How to Contribute

### Reporting Issues

If you find a bug or have a suggestion for improvement:

1. Check if the issue already exists in the [Issues](https://github.com/your-repo/issues) section
2. Create a new issue with a clear title and description
3. Include steps to reproduce the problem (if applicable)
4. Add screenshots or error messages if relevant

### Suggesting Enhancements

We welcome suggestions for:

- **Tutorial improvements**: Better explanations, additional examples, clearer instructions
- **Code improvements**: Bug fixes, performance optimizations, better error handling
- **UI/UX enhancements**: Better user interface, improved user experience
- **Documentation**: Additional documentation, better examples, clearer explanations

### Submitting Code Changes

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**:
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation as needed
4. **Test your changes**:
   ```bash
   npm test
   cd frontend && npm test && cd ..
   ```
5. **Commit your changes**:
   ```bash
   git commit -m "Add: brief description of your changes"
   ```
6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

## 📋 Development Guidelines

### Code Style

- Use consistent indentation (2 spaces for JavaScript/React, 4 spaces for Solidity)
- Follow existing naming conventions
- Add comments for complex logic
- Keep functions small and focused

### Testing

- Write tests for new functionality
- Ensure all existing tests pass
- Test both success and error cases
- Include integration tests for smart contracts

### Documentation

- Update README.md for significant changes
- Add comments to complex code
- Update tutorial documentation for new features
- Include examples in your changes

## 🎯 Areas for Contribution

### High Priority

- **Bug fixes**: Any issues that prevent the tutorial from working
- **Tutorial improvements**: Better explanations, clearer instructions
- **Error handling**: Better error messages and user feedback
- **Mobile responsiveness**: Ensure the frontend works well on mobile devices

### Medium Priority

- **Additional examples**: More use cases and examples
- **Performance improvements**: Faster loading, better user experience
- **Accessibility**: Better accessibility for users with disabilities
- **Internationalization**: Support for multiple languages

### Low Priority

- **Advanced features**: More complex FHEVM examples
- **UI enhancements**: Better visual design
- **Additional documentation**: More detailed explanations

## 🧪 Testing

### Smart Contract Testing

```bash
# Run smart contract tests
npx hardhat test

# Run tests with coverage
npx hardhat coverage
```

### Frontend Testing

```bash
# Run frontend tests
cd frontend
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Manual Testing

1. **Deploy the contract** to Sepolia testnet
2. **Test the frontend** with different scenarios
3. **Verify privacy** by checking Etherscan
4. **Test with multiple accounts** to ensure privacy

## 📝 Pull Request Guidelines

### Before Submitting

- [ ] Code follows the project's style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] Changes are tested manually
- [ ] No console.log statements in production code

### Pull Request Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Tested on different browsers/devices

## Screenshots (if applicable)
Add screenshots to help explain your changes

## Additional Notes
Any additional information about the changes
```

## 🏆 Recognition

Contributors will be recognized in:

- **README.md**: Listed as contributors
- **Release notes**: Mentioned in release announcements
- **Community**: Recognized in the Zama community

## 📞 Getting Help

If you need help contributing:

- **GitHub Issues**: Ask questions in the Issues section
- **Discord**: Join the [Zama Discord](https://discord.gg/zama) community
- **Documentation**: Check the [FHEVM docs](https://docs.zama.ai/fhevm)
- **Sepolia Faucet**: Get testnet tokens from [Sepolia Faucet](https://sepoliafaucet.com/)

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to the Hello FHEVM tutorial! Together, we can make FHEVM more accessible to developers worldwide. 🚀
