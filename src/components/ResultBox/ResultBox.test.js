import { render, screen, cleanup } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';

  describe('Component ResultBox', () => {
    it('should render without crashing', () => {

        const testCases = [
            { amount: 100, from: 'PLN', to: 'USD' },
            { amount: 20, from: 'USD', to: 'PLN' },
            { amount: 200, from: 'PLN', to: 'USD' },
            { amount: 345, from: 'USD', to: 'PLN' },
        ];
    
        for(const testObj of testCases) {

            render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
            cleanup()
        }
    });

    it('should render proper info about conversion when PLN -> USD', () => {
        
        // render component
        render(<ResultBox from="PLN" to="USD" amount={100} />);

        const output = screen.getByTestId('output');

        expect(output).toHaveTextContent('PLN 100.00 = $28.57');
        cleanup()

    });

    it('should render proper info about conversion when USD -> PLN', () => {
        // render component
        render(<ResultBox from="USD" to="PLN" amount={20} />);

        const output = screen.getByTestId('output');

        expect(output).toHaveTextContent('$20.00 = PLN 70');
        cleanup()
    });

    it('should render proper info about conversion when same currency is selected', () => {

        render(<ResultBox from="PLN" to="PLN" amount={123} />);

        const output = screen.getByTestId('output');

        expect(output).toHaveTextContent('PLN 123.00 = PLN 123.00');
        cleanup()

    });

    it('should render "Wrong value..." when value is lower than zero', () => {

        render(<ResultBox from="PLN" to="USD" amount={-123} />);

        const output = screen.getByTestId('output');

        expect(output).toHaveTextContent('Wrong value...');
        cleanup()

    });

});
